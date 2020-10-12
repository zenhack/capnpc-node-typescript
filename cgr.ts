import capnp from 'capnp';
import schema from './capnp/schema.capnp.js';

import * as iolist from './iolist.js';

function impossible(n: never): never {
  return n;
}

type NodeId = string;

type StrDict<T> = { [k: string]: T }

type NodeMap = StrDict<schema.types_.Node.Reader>

interface FileOutSpec {
  filename: string;
  imports: { id: NodeId, name: string }[];
  root: NodeOutSpec;
}

interface NodeOutSpec {
  id: NodeId;
  kids: StrDict<NodeOutSpec>;
  struct?: StructOutSpec;
  enum?: string[];
  interface?: InterfaceOutSpec;
}

interface InterfaceOutSpec {
  superIds: TypeById[];
  methods: StrDict<MethodOutSpec>;
}

interface MethodOutSpec {
  params: ArgsOutSpec;
  results: ArgsOutSpec;
}

type ArgsOutSpec =
  | { declared: TypeRef }
  | { listed: FieldSpec[] }
  ;

interface StructOutSpec {
  commonFields: FieldSpec[];
  unionFields: StrDict<FieldSpec[]>;
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
  | { group: StructOutSpec }
  | { struct: TypeById }
  | { enum: TypeById }
  | { interface: TypeById }
);

interface TypeById {
  typeId: NodeId;
  fileId?: NodeId;
}

function assertDefined<T>(arg: T | undefined): T {
  if(arg === undefined) {
    throw new Error('Undefined.');
  }
  return arg;
}

function definedOr<T>(arg: T | undefined, def: T): T {
  if(arg === undefined) {
    return def
  } else {
    return arg
  }
}

function findNodeFile(nodeId: NodeId, nodeMap: NodeMap): schema.types_.Node.Reader {
  // Find the root scope of 'nodeId', which must be a file. Throws
  // if node's root scope is not a file, or if some node in the chain is
  // not in the nodeMap.

  let node;
  do {
    node = nodeMap[nodeId];
    if(node === undefined) {
      throw new Error("Couldn't climb scope; " + nodeId + " is not in the NodeMap");
    }
    nodeId = assertDefined(node.scopeId);
  } while(nodeId !== '0');

  if(!('file' in node)) {
    throw new Error("node's root scope is not a file!");
  }
  return node;
}

function formatSchemaType(path: Array<string>): iolist.IoList {
  const name = path.join('.');
  return [
    '$Capnp.StructSchema<types_.', name, '.Reader, types_.', name, '.Builder>',
  ]
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
    result.push([k, ': ', formatSchemaType(path), ' & {\n']);
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
      ['export const ', name, ': ', formatSchemaType(path), ' & {\n'],
      formatValueTypes(path, spec, struct),
      '};\n',
    ]
  }
  return [];
}

function formatTypesById(path: iolist.IoList, spec: NodeOutSpec): iolist.IoList {
  const ret: iolist.IoList = ['export module $', spec.id, ' {\n'];
  if('struct' in spec || 'enum' in spec) {
    ret.push([
      'export type Builder = ', path, '.Builder;\n',
      'export type Reader = ', path, '.Reader;\n',
    ]);
  } else if('interface' in spec) {
    ret.push([
      'export type Client = ', path, '.Client;\n',
      'export type Server = ', path, '.Server;\n',
    ]);
  }
  ret.push('}\n');
  for(const k in spec.kids) {
    const kid = spec.kids[k];
    ret.push(formatTypesById([path, '.', k], kid));
  }
  return ret;
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
      formatStructInterface('Builder', struct),
      formatStructInterface('Reader', struct),
    ]);
  } else if('enum' in spec) {
    const enu = assertDefined(spec.enum);
    result.push([
      formatEnumInterface('Builder', enu),
      formatEnumInterface('Reader', enu),
    ]);
  } else if('interface' in spec) {
    const iface = assertDefined(spec.interface);
    result.push([
      formatInterfaceInterface('Client', iface),
      formatInterfaceInterface('Server', iface),
    ]);
  }
  result.push(body);
  result.push('\n}\n');
  return result;
}

function formatInterfaceInterface(mode: "Client" | "Server", iface: InterfaceOutSpec): iolist.IoList {
  const ret: iolist.IoList = ['type ', mode, ' = $Capnp.Any', mode]
  for(let i = 0; i < iface.superIds.length; i++) {
    ret.push([' & ', formatTypeById(mode, iface.superIds[i])])
  }
  ret.push(' & {\n')
  for(const name in iface.methods) {
    ret.push(formatMethod(mode, name, iface.methods[name]))
  }
  ret.push('}\n')
  return ret
}

function formatMethod(mode: "Client" | "Server", name: string, method: MethodOutSpec) {
  const ret: iolist.IoList[] = [name];
  if(mode === "Server") {
    ret.push("?")
  }
  ret.push(":(");
  const argMode = (mode === "Server")? "Reader" : "Builder";
  if('declared' in method.params) {
    ret.push(["param: ", formatTypeRef(argMode, method.params.declared)]);
  } else {
    ret.push(formatArgList(argMode, method.params.listed));
  }
  ret.push(") => ");
  const resultMode = (mode === "Client")? "Reader" : "Builder";
  let result: iolist.IoList = [];
  if('declared' in method.results) {
    result.push(formatTypeRef(resultMode, method.results.declared));
  } else {
    result.push(['{', formatArgList(resultMode, method.results.listed), '}']);
  }
  if(mode === "Client") {
    result = ["Promise<", result, ">"];
  } else {
    result = ["Promise<", result, "> | ", result];
  }
  ret.push([result, ",\n"]);
  return ret
}

function formatArgList(mode: "Builder" | "Reader", args: FieldSpec[]): iolist.IoList {
  const ret = []
  for(let i = 0; i < args.length; i++) {
    if(i !== 0) {
      ret.push(', ')
    }
    const {name, type} = args[i];
    ret.push([name, ': ', formatTypeRef(mode, type)]);
  }
  return ret;
}

function formatEnumInterface(mode: "Builder" | "Reader", enumerants: string[]): iolist.IoList {
  let ret: iolist.IoList = ['type ', mode, ' = '];
  for(let i = 0; i < enumerants.length; i++) {
    ret = [ret, ' | ', JSON.stringify(enumerants[i])];
  }
  if(mode === 'Reader') {
    ret = [ret, ' | number'];
  }
  ret = [ret, ';\n'];
  return ret;
}

function formatStructInterface(mode: "Builder" | "Reader", struct: StructOutSpec): iolist.IoList {
  return ['type ', mode, ' = ', formatStructFields(mode, struct), "\n"];
}

function formatStructFields(mode: "Builder" | "Reader", struct: StructOutSpec) {
  const fields = ["{ ", formatFields(mode, struct.commonFields), " }"];
  const keys = Object.getOwnPropertyNames(struct.unionFields);
  if(keys.length > 0) {
    fields.push([" & ({ ", formatFields(mode, struct.unionFields[keys[0]]), " }"]);
    for(let i = 1; i < keys.length; i++) {
      fields.push(" | {");
      fields.push(formatFields(mode, struct.unionFields[keys[i]]));
      fields.push("}");
    }
    fields.push(" | {})");
  }
  return fields;
}

function formatFields(mode: "Builder" | "Reader", fields: FieldSpec[]): iolist.IoList {
  const result = [];
  for(const field of fields) {
    result.push(field.name);
    if(mode === 'Builder') {
      result.push('?');
    }
    result.push([': ', formatTypeRef(mode, field.type), ";\n"]);
  }
  return result;
}

function formatTypeById(mode: string, typ: TypeById): iolist.IoList {
      let ret: iolist.IoList = ['$', typ.typeId, '.', mode];
      if('fileId' in typ) {
        ret = ['$', assertDefined(typ.fileId), '.', ret];
      }
      return ret;
}

function formatTypeRef(mode: "Builder" | "Reader", typ: TypeRef): iolist.IoList {
  if(typ instanceof Object) {
    if('list' in typ) {
      return [formatTypeRef(mode, typ.list), '[]']
    } else if('group' in typ) {
      return formatStructFields(mode, typ.group);
    } else if('struct' in typ) {
      return formatTypeById(mode, typ.struct);
    } else if('enum' in typ) {
      return formatTypeById(mode, typ.enum);
    } else if('interface' in typ) {
      const iface = typ.interface;
      const imode = (mode === "Builder")? "Server" : "Client";
      return formatTypeById(imode, iface);
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
    types.push([
      formatTypes(k, ['types_', k], spec.root.kids[k]),
      formatTypesById(['types_.', k], spec.root.kids[k]),
    ])
    values.push(formatValues(k, [k], spec.root.kids[k]))
  }
  const imports: iolist.IoList = [];
  for(const imp of spec.imports) {
    let importName = imp.name;
    while(importName.startsWith('/')) {
      importName = importName.slice(1);
    }
    const path = JSON.stringify(importName + ".js");
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

function handleCgr(cgr: schema.types_.CodeGeneratorRequest.Reader): CgrOutSpec {
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
  requestedFile: schema.types_.CodeGeneratorRequest.RequestedFile.Reader,
): FileOutSpec {
  const fileId = assertDefined(requestedFile.id);
  const fileNode = nodeMap[fileId];
  const ns = handleNode(nodeMap, fileId, fileNode);
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

function handleField(nodeMap: NodeMap, thisFileId: NodeId, field: schema.types_.Field.Reader): FieldSpec {
  if('slot' in field) {
    return {
      name: assertDefined(field.name),
      type: makeTypeRef(nodeMap, thisFileId, assertDefined(field.slot.type)),
    };
  } else if('group' in field) {
    const groupId = assertDefined(field.group.typeId);
    const groupNode = assertDefined(nodeMap[groupId]);
    const groupSpec = handleNode(nodeMap, thisFileId, groupNode);
    const groupStruct = groupSpec.struct;
    if(groupStruct === undefined) {
      throw new Error("Group field " + field.toString() + " is not a struct.");
    }
    return {
      name: assertDefined(field.name),
      type: { group: groupStruct },
    };
  } else {
    throw new Error("Unsupported field type (neither slot nor group)");
  }
}

function handleNode(nodeMap: NodeMap, thisFileId: NodeId, node: schema.types_.Node.Reader): NodeOutSpec {
  const kids: StrDict<NodeOutSpec> = {};
  for(const nestedNode of node.nestedNodes || []) {
    const kid: schema.types_.Node.Reader = nodeMap[assertDefined(nestedNode.id)];
    kids[assertDefined(nestedNode.name)] = handleNode(nodeMap, thisFileId, kid);
  }
  const result: NodeOutSpec = {
    id: assertDefined(node.id),
    kids: assertDefined(kids),
  }

  // TODO: generate constants, then uncomment this.
  //const noDiscrim = schema.Field.noDiscriminant;
  const noDiscrim = 0xffff;

  if('struct' in node) {
    const unionFields: StrDict<FieldSpec[]> = {};
    unionFields[noDiscrim] = [];
    if('fields' in node.struct) {
      for(const field of assertDefined(node.struct.fields)) {
        const tag = assertDefined(field.discriminantValue);
        if(!(tag in unionFields)) {
          unionFields[tag] = [];
        }
        const fields = assertDefined(unionFields[tag]);
        fields.push(handleField(nodeMap, thisFileId, field))
      }
    }
    const commonFields = unionFields[noDiscrim];
    delete unionFields[noDiscrim];
    result.struct = { commonFields, unionFields };
  } else if('enum' in node) {
    const enumerants = assertDefined(node.enum.enumerants);
    result.enum = [];
    for(let i = 0; i < enumerants.length; i++) {
      result.enum.push(assertDefined(enumerants[i].name));
    }
  } else if('interface' in node) {
    const iface = node.interface;
    const supers = assertDefined(iface.superclasses);
    const methods = assertDefined(iface.methods);
    const spec: InterfaceOutSpec = {
      superIds: [],
      methods: {}
    }
    for(let i = 0; i < supers.length; i++) {
      spec.superIds.push(typeById(nodeMap, thisFileId, assertDefined(supers[i].id)));
    }
    for(let i = 0; i < methods.length; i++) {
      const method = assertDefined(methods[i]);
      spec.methods[assertDefined(method.name)] = {
        params: handleParamResult(nodeMap, thisFileId, method.paramStructType),
        results: handleParamResult(nodeMap, thisFileId, method.resultStructType),
      };
    }
    result.interface = spec;
  }
  return result;
}

function handleParamResult(nodeMap: NodeMap, thisFileId: NodeId, structId: NodeId): ArgsOutSpec {
  const node = assertDefined(nodeMap[structId]);
  const fields = [];
  if(node.scopeId === '0') {
    if(!('struct' in node)) {
      throw new Error('parameter or result type was not a struct');
    }
    const fields = definedOr(node.struct.fields, []);
    const listed = [];
    for(let i = 0; i < fields.length; i++) {
      listed.push(handleField(nodeMap, thisFileId, fields[i]));
    }
    return { listed }
  } else {
    return { declared: { struct: typeById(nodeMap, thisFileId, structId) } }
  }
}

function typeById(nodeMap: NodeMap, thisFileId: NodeId, typeId: NodeId): TypeById {
    const fileId = assertDefined(findNodeFile(typeId, nodeMap).id);
    if(fileId === thisFileId) {
      return { typeId }
    } else {
      return { typeId, fileId }
    }
}

function makeTypeRef(nodeMap: NodeMap, thisFileId: NodeId, typ: schema.types_.Type.Reader): TypeRef {
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
    return { list: makeTypeRef(nodeMap, thisFileId, typ.list.elementType) }
  } else if('anyPointer' in typ) {
    // TODO: sanity check that node-capnp really treats all anyPointers this way.
    return 'Buffer';
  } else if('struct' in typ) {
    return { struct: typeById(nodeMap, thisFileId, typ.struct.typeId) }
  } else if('enum' in typ) {
    return { enum: typeById(nodeMap, thisFileId, typ.enum.typeId) }
  } else if('interface' in typ) {
    return { interface: typeById(nodeMap, thisFileId, typ.interface.typeId) }
  /*
  } else {
    console.error("Unknown type: ", typ, "; can't make type ref.");
    throw new Error("Unknown type can't make type ref.");
  */
  }
  return 'void';
}

export function cgrToFileContents(cgr: schema.types_.CodeGeneratorRequest.Reader): StrDict<iolist.IoList> {
  return formatCgr(handleCgr(cgr));
}
