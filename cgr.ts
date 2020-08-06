import capnp from 'capnp';
import schema from './schema-bootstrap.js';

import * as iolist from './iolist.js';

function impossible(n: never): never {
  return n;
}

type StrDict<T> = { [k: string]: T }

type NodeMap = StrDict<schema.Node>

interface FileOutSpec {
  filename: string;
  imports: { id: string, name: string }[];
  root: NodeOutSpec;
}

interface NodeOutSpec {
  id: string;
  kids: StrDict<NodeOutSpec>;
  struct?: StructOutSpec;
}

interface StructOutSpec {
  fields: FieldSpec[];
}

interface FieldSpec {
  name: string;
  type: TypeRef;
}

type TypeRef = (
  "void"
  | "boolean"
  | "number"
  | "string"
  | "Buffer"
  | { list: TypeRef }
  | { group: FieldSpec[] }
);

function assertDefined<T>(arg: T | undefined): T {
  if(arg === undefined) {
    throw new Error('Undefined.');
  }
  return arg;
}

function formatValueTypes(path: Array<string>, spec: NodeOutSpec, struct: StructOutSpec): iolist.IoList {
  const result: iolist.IoList = [];
  const keys = Object.getOwnPropertyNames(spec.kids);
  for(const k of keys) {
    const kid = spec.kids[k];
    const struct = kid.struct;
    if(struct === undefined) {
      continue;
    }
    path.push(k);
    result.push([k, ': $Capnp.Schema<types_.', path.join('.'), '.Reader> & {\n']);
    result.push(formatValueTypes(path, kid, struct));
    result.push('\},\n');
    path.pop();
  }
  return result;
}

function formatValues(name: string, path: Array<string>, spec: NodeOutSpec): iolist.IoList {
  const struct = spec.struct;
  if(struct !== undefined) {
    return [
      ['export const ', name, ': $Capnp.Schema<types_.', path.join('.'), '.Reader> & {\n'],
      formatValueTypes(path, spec, struct),
      '};\n',
    ]
  }
  return [];
}

function formatTypes(name: string, path: Array<string>, spec: NodeOutSpec): iolist.IoList {
  const body = [];
  for(const k of Object.getOwnPropertyNames(spec.kids)) {
    path.push(k);
    body.push(formatTypes(k, path, spec.kids[k]));
    path.pop();
  }

  const result = [];
  result.push(['export module ', name, '{\n']);
  if('struct' in spec) {
    const struct = assertDefined(spec.struct);
    result.push([
      formatStructInterface('Builder', struct.fields),
      formatStructInterface('Reader', struct.fields),
    ]);
  }
  result.push(body);
  result.push('\n}\n');
  return result;
}

function formatStructInterface(mode: "Builder" | "Reader", fields: FieldSpec[]) {
  return ['export interface ', mode, ' {\n', formatFields(mode, fields), "\n}\n"];
}

function formatFields(mode: "Builder" | "Reader", fields: FieldSpec[]): iolist.IoList {
  const result = [];
  for(const field of fields) {
    result.push(field.name);
    if(mode === 'Builder') {
      result.push('?');
    }
    result.push([': ', formatTypeRef(mode, field.type), ";"]);
  }
  return result;
}

function formatTypeRef(mode: "Builder" | "Reader", typ: TypeRef): iolist.IoList {
  if(typ instanceof Object) {
    if('list' in typ) {
      return [formatTypeRef(mode, typ.list), '[]']
    } else if('group' in typ) {
      return ["{", formatFields(mode, typ.group), "}"];
    } else {
      return impossible(typ);
    }
  } else {
    // some kind of string constant.
    return typ
  }
}

function formatDeclFile(spec: FileOutSpec): iolist.IoList {
  const types: iolist.IoList = [];
  const values: iolist.IoList = [];
  const keys = Object.getOwnPropertyNames(spec.root.kids);
  for(const k of keys) {
    types.push(formatTypes(k, ['types_', k], spec.root.kids[k]))
    values.push(formatValues(k, [k], spec.root.kids[k]))
  }
  const imports: iolist.IoList = [];
  for(const imp of spec.imports) {
    const path = JSON.stringify(imp.name + ".js");
    imports.push(['import * as $', imp.id, ' from ', path, ';\n']);
  }
  return [
    'import $Capnp from "capnp";\n',
    imports,
    'declare module $tmp {\n',
    'export module types_ {\n',
    types,
    '}\n',
    values,
    '\n}\n',
    'export default $tmp;',
  ]
}

function formatJsFile(spec: FileOutSpec): iolist.IoList {
  return [
    'import $Capnp from "capnp";\n',
    'const $tmp = $Capnp.importSystem(', JSON.stringify(spec.filename), ')\n',
    'export default $tmp\n',
  ]
}

interface CgrOutSpec {
  [file: string]: FileOutSpec;
}

function formatCgr(cgr: CgrOutSpec): StrDict<iolist.IoList> {
  const result: StrDict<iolist.IoList> = {};
  for(const k of Object.getOwnPropertyNames(cgr)) {
    result[k + '.d.ts'] = formatDeclFile(cgr[k]);
    result[k + '.js'] = formatJsFile(cgr[k])
  }
  return result
}

function handleCgr(cgr: schema.CodeGeneratorRequest): CgrOutSpec {
  const nodeMap: NodeMap = {};
  for(const node of assertDefined(cgr.nodes)) {
    nodeMap[assertDefined(node.id)] = node;
  }

  const out: CgrOutSpec = {}

  for(const file of assertDefined(cgr.requestedFiles)) {
    out[assertDefined(file.filename)] = handleFile(nodeMap, file)
  }
  return out;
}

function handleFile(
  nodeMap: NodeMap,
  requestedFile: schema.CodeGeneratorRequest.RequestedFile,
): FileOutSpec {
  const fileNode = nodeMap[assertDefined(requestedFile.id)];
  const ns = handleNode(nodeMap, fileNode);
  const ret: FileOutSpec = {
    filename: assertDefined(requestedFile.filename),
    imports: [],
    root: ns,
  };
  for(const imp of assertDefined(requestedFile.imports)) {
    ret.imports.push({
      id: assertDefined(imp.id),
      name: assertDefined(imp.name),
    });
  }
  return ret;
}

function handleNode(nodeMap: NodeMap, node: schema.Node): NodeOutSpec {
  const kids: StrDict<NodeOutSpec> = {};
  for(const nestedNode of node.nestedNodes || []) {
    const kid: schema.Node = nodeMap[assertDefined(nestedNode.id)];
    kids[assertDefined(nestedNode.name)] = handleNode(nodeMap, kid);
  }
  const result: NodeOutSpec = {
    id: assertDefined(node.id),
    kids: assertDefined(kids),
  }
  if('struct' in node) {
    // TODO: make note of union variants.
    const fields: FieldSpec[] = [];
    if('fields' in node.struct) {
      for(const field of assertDefined(node.struct.fields)) {
        if('slot' in field) {
          fields.push({
            name: assertDefined(field.name),
            type: makeTypeRef(assertDefined(field.slot.type)),
          });
        } else if('group' in field) {
          const groupId = assertDefined(field.group.typeId);
          const groupNode = assertDefined(nodeMap[groupId]);
          const groupSpec = handleNode(nodeMap, groupNode);
          const groupStruct = groupSpec.struct;
          if(groupStruct === undefined) {
            throw new Error("Group field " + field.toString() + " is not a struct.");
          }
          fields.push({
            name: assertDefined(field.name),
            type: { group: groupStruct.fields },
          });
        } else {
          throw new Error("Unsupported field type (neither slot nor group)");
        }
      }
    }
    result.struct = {
      fields,
    };
  }
  return result;
}

function makeTypeRef(typ: schema.Type): TypeRef {
  if('void' in typ) {
    return 'void'
  } else if('bool' in typ) {
    return 'boolean'
  } else if('int8' in typ ||
      'int16' in typ ||
      'int32' in typ ||
      'uint8' in typ ||
      'uint16' in typ) {
    // Integers faithfully representable as a float64.
    return 'number';
  } else if('uint32' in typ || 'uint64' in typ || 'int64' in typ) {
    // Not representable as a float; these get encoded as strings.
    // TODO: double check that this is what node-capnp actually does.
    return 'string';
  } else if('float32' in typ || 'float64' in typ) {
    return 'number';
  } else if('text' in typ) {
    return 'string';
  } else if('data' in typ) {
    return 'Buffer';
  } else if('list' in typ) {
    return { list: makeTypeRef(typ.list.elementType) }
  } else if('anyPointer' in typ) {
    // TODO: sanity check that node-capnp really treats all anyPointers this way.
    return 'Buffer';
  }
  /*
  } else if('struct' in typ) {
    throw new Error("TODO: handle structs.")
  } else if('enum' in typ) {
    throw new Error("TODO: handle enums.")
  } else if('interface' in typ) {
    throw new Error("TODO: handle interfaces.")
  } else {
    console.error("Unknown type: ", typ, "; can't make type ref.");
    throw new Error("Unknown type can't make type ref.");
  }
  */
  return 'void';
}

export function cgrToFileContents(cgr: schema.CodeGeneratorRequest): StrDict<iolist.IoList>  {
  return formatCgr(handleCgr(cgr));
}
