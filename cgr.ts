import capnp from 'capnp';
import schema from './capnp/schema.capnp.js';
import { StrDict, impossible, assertDefined, definedOr } from './util.js';

import * as iolist from './iolist.js';

type Polarity = "Pos" | "Neg";

type NodeId = string;

type NodeMap = StrDict<schema.types_.Node.Reader>;

interface ParamDirectory {
  nameMap: StrDict<string[]>;
  transMap: StrDict<TypeParamInfo[]>;
}

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
  typeParams: TypeParamInfo[];

  // TODO: we really should refactor this so that the types & constants
  // are different parts of a union.
  constant?: TypeRef;
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

function flipPolarity(p: Polarity): Polarity {
  return (p === "Pos")? "Neg" : "Pos";
}

type TypeRef = (
  "void"
  | "boolean"
  | "number"
  | "string"
  | "Buffer"
  | "Capability"
  | { list: TypeRef }
  | { group: StructOutSpec }
  | { struct: TypeById }
  | { enum: TypeById }
  | { interface: TypeById }
  | { paramName: string }
);

interface TypeById {
  typeId: NodeId;
  fileId?: NodeId;
  typeParams: TypeRef[];
}


interface SpecBuilderCtx {
  paramDir: ParamDirectory;
  nodeMap: NodeMap;
  thisFileId: NodeId;
}

interface TypeParamInfo {
  scopeId: NodeId;
  index: number;
  name: string;
}

function instantiateTypeParams(
  ctx: SpecBuilderCtx,
  typeId: NodeId,
  brand: schema.types_.Brand.Reader): TypeRef[] {
    const scopeMap: StrDict<schema.types_.Brand.Scope.Reader> = {};

    const scopes = definedOr(brand.scopes, []);
    for(const scope of scopes) {
      scopeMap[scope.scopeId] = scope;
    }

    const allParams = assertDefined(ctx.paramDir.transMap[typeId]);
    return allParams.map(p => {
      const scope = scopeMap[p.scopeId];
      if('inherit' in scope) {
        return { paramName: p.name }
      } else if('bind' in scope) {
        const bind = assertDefined(assertDefined(scope.bind)[p.index]);
        if('unbound' in bind) {
          return 'Buffer';
        } else if('type' in bind) {
          return makeTypeRef(ctx, assertDefined(bind.type));
        } else {
          throw new Error("Unknown Binding variant");
        }
      } else {
        throw new Error("Unknown Brand.Scope variant");
      }
    });
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
    if(struct !== undefined) {
      path.push(k);
      result.push([k, ': ', formatSchemaType(path), ' & {\n'])
      result.push(formatValueTypes(path, kid, struct));
      result.push('\},\n');
      path.pop();
    }
    const constant = kid.constant;
    if(constant !== undefined) {
      result.push([k, ': ', formatTypeRef('Pos', constant), ',\n']);
    }
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

  const constant = spec.constant;
  if(constant !== undefined) {
    return ['export const ', name, ': ', formatTypeRef('Pos', constant), ";\n"];
  }

  return [];
}

function formatTypesById(path: iolist.IoList, spec: NodeOutSpec): iolist.IoList {
  const ret: iolist.IoList = ['export module $', spec.id, ' {\n'];
  const params = spec.typeParams.map(({name}) => { return { paramName: name } });
  const posParams = formatTypeParams('Pos', params);
  const negParams = formatTypeParams('Neg', params);
  const mkAlias = function (typ: string, params: iolist.IoList): iolist.IoList {
    return ['export type ', typ, params, ' = ', path, '.', typ, params, ';\n'];
  }

  if('struct' in spec || 'enum' in spec) {
    ret.push([
      mkAlias('Builder', negParams),
      mkAlias('Reader', posParams),
    ]);
  } else if('interface' in spec) {
    ret.push([
      mkAlias('Client', posParams),
      mkAlias('Server', negParams),
    ]);
  }
  if('struct' in spec || 'enum' in spec || 'interface' in spec) {
    ret.push([
      mkAlias('Pos', posParams),
      mkAlias('Neg', negParams),
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
      formatStructInterface('Pos', struct, spec.typeParams),
      formatStructInterface('Neg', struct, spec.typeParams),
    ]);
  } else if('enum' in spec) {
    const enu = assertDefined(spec.enum);
    result.push([
      formatEnumInterface('Pos', enu),
      formatEnumInterface('Neg', enu),
    ]);
  } else if('interface' in spec) {
    const iface = assertDefined(spec.interface);
    result.push([
      formatInterfaceInterface('Pos', iface, spec.typeParams),
      formatInterfaceInterface('Neg', iface, spec.typeParams),
    ]);
  }
  result.push(body);
  result.push('\n}\n');
  return result;
}

function formatInterfaceInterface(
  polarity: Polarity,
  iface: InterfaceOutSpec,
  typeParams: TypeParamInfo[]): iolist.IoList {
    const paramNames = formatTypeParams(polarity, typeParams.map(param => {
      return { paramName: param.name }
    }));
    const mode = (polarity === "Pos")? "Client" : "Server";

    const ret: iolist.IoList = ['type ', polarity, paramNames, ' = $Capnp.Any', mode]
    for(let i = 0; i < iface.superIds.length; i++) {
      ret.push([' & ', formatTypeById(polarity, iface.superIds[i])])
    }
    ret.push(' & {\n')
    for(const name in iface.methods) {
      ret.push(formatMethod(polarity, name, iface.methods[name]))
    }
    ret.push('}\n')
    ret.push(['type ', mode, paramNames, ' = ', polarity, paramNames, ";\n"])
    return ret
}

function formatMethod(polarity: Polarity, name: string, method: MethodOutSpec) {
  const ret: iolist.IoList[] = [name];
  if(clientOrServer(polarity) === "Server") {
    ret.push("?")
  }
  ret.push(":(");
  if('declared' in method.params) {
    ret.push(["param: ", formatTypeRef(flipPolarity(polarity), method.params.declared)]);
  } else {
    ret.push(formatArgList(flipPolarity(polarity), method.params.listed));
  }
  ret.push(") => ");
  let result: iolist.IoList = [];
  if('declared' in method.results) {
    result.push(formatTypeRef(polarity, method.results.declared));
  } else {
    result.push(['{', formatArgList(polarity, method.results.listed), '}']);
  }
  if(clientOrServer(polarity) === "Client") {
    result = ["Promise<", result, ">"];
  } else {
    result = ["Promise<", result, "> | ", result];
  }
  ret.push([result, ",\n"]);
  return ret
}

function formatArgList(polarity: Polarity, args: FieldSpec[]): iolist.IoList {
  return iolist.join(", ", args.map(({name, type}) => {
      return [name, ': ', formatTypeRef(polarity, type)];
  }))
}

function formatEnumInterface(polarity: Polarity, enumerants: string[]): iolist.IoList {
  const mode = (polarity == "Pos")? "Reader" : "Builder";
  let ret: iolist.IoList = ['type ', polarity, ' = '];
  for(let i = 0; i < enumerants.length; i++) {
    ret = [ret, ' | ', JSON.stringify(enumerants[i])];
  }
  if(polarity === 'Pos') {
    ret = [ret, ' | number'];
  }
  ret = [
    ret, ';\n',
    'type ', mode, ' = ', polarity, ';\n',
  ];
  return ret;
}

function formatTypeParams(polarity: Polarity, typeParams: TypeRef[]): iolist.IoList {
  if(typeParams.length === 0) {
    return '';
  }
  const args: iolist.IoList[] = [];
  for(let i = 0; i < typeParams.length; i++) {
    const typeRef = typeParams[i];
    args.push([
      formatTypeRef(polarity, typeRef),
      ",",
      formatTypeRef(flipPolarity(polarity), typeRef),
    ])
  }
  return ['<', iolist.join(", ", args), '>'];
}

function formatStructInterface(polarity: Polarity, struct: StructOutSpec, typeParams: TypeParamInfo[]): iolist.IoList {
  const paramNames = formatTypeParams(polarity, typeParams.map(param => {
    return { paramName: param.name }
  }));
  const mode = (polarity === "Pos")? "Reader" : "Builder";
  return [
    ['type ', polarity, paramNames, ' = ', formatStructFields(polarity, struct), "\n"],
    ['type ', mode, paramNames, ' = ', polarity, paramNames, ";\n"],
  ]
}

function formatStructFields(polarity: Polarity, struct: StructOutSpec): iolist.IoList {
  const fields = ["{ ", formatFields(polarity, struct.commonFields), " }"];
  const keys = Object.getOwnPropertyNames(struct.unionFields);
  if(keys.length > 0) {
    fields.push([" & ({ ", formatFields(polarity, struct.unionFields[keys[0]]), " }"]);
    for(let i = 1; i < keys.length; i++) {
      fields.push(" | {");
      fields.push(formatFields(polarity, struct.unionFields[keys[i]]));
      fields.push("}");
    }
    fields.push(" | {})");
  }
  return fields;
}

function formatFields(polarity: Polarity, fields: FieldSpec[]): iolist.IoList {
  const result = [];
  for(const field of fields) {
    result.push(field.name);
    if(polarity == "Neg" || isPointerType(field.type)) {
      result.push('?');
    }
    result.push([': ', formatTypeRef(polarity, field.type), ";\n"]);
  }
  return result;
}

function isPointerType(typ: TypeRef): boolean {
  if(typeof(typ) === 'object') {
    if('list' in typ) return true;
    if('struct' in typ) return true;
    if('interface' in typ) return true;
    if('group' in typ) return false;
    if('enum' in typ) return false;
    if('paramName' in typ) return true;
    return impossible(typ);
  } else {
    switch(typ) {
    case "Capability":
    case "Buffer":
        return true;
    case "void":
    case "boolean":
    case "number":
    case "string":
        return false;
    default:
        return impossible(typ);
    }
  }
}

function formatTypeById(polarity: Polarity, typ: TypeById): iolist.IoList {
      let ret: iolist.IoList =
        ['$', typ.typeId, '.', polarity, formatTypeParams(polarity, typ.typeParams)];
      if('fileId' in typ) {
        ret = ['$', assertDefined(typ.fileId), '.types_.', ret];
      }
      return ret;
}

function readerOrBulder(polarity: Polarity): "Reader" | "Builder" {
  if(polarity === "Neg") {
    return "Builder";
  } else {
    return "Reader";
  }
}

function clientOrServer(polarity: Polarity): "Client" | "Server" {
  if(polarity === "Neg") {
    return "Server";
  } else {
    return "Client";
  }
}

function formatTypeRef(polarity: Polarity, typ: TypeRef): iolist.IoList {
  if(typ instanceof Object) {
    if('list' in typ) {
      return [formatTypeRef(polarity, typ.list), '[]']
    } else if('group' in typ) {
      return formatStructFields(polarity, typ.group);
    } else if('struct' in typ) {
      return formatTypeById(polarity, typ.struct);
    } else if('enum' in typ) {
      return formatTypeById(polarity, typ.enum);
    } else if('interface' in typ) {
      const iface = typ.interface;
      return formatTypeById(polarity, iface);
    } else if('paramName' in typ) {
      const name = typ.paramName;
      return [name, '_', polarity];
    } else {
      return impossible(typ);
    }
  } else if(typ === "Capability") {
    return ["$Capnp.Any", clientOrServer(polarity)];
  } else {
    // some other kind of string constant.
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

    // JS conventions for relative vs. absolute paths are inverted vs. capnp:
    if(importName.startsWith('/')) {
      importName = importName.slice(1);
    } else {
      importName = './' + importName;
    }

    const path = JSON.stringify(importName + ".js");
    imports.push(['import $', imp.id, ' from ', path, ';\n']);
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

function buildParamDirectory(nodeMap: NodeMap): ParamDirectory {
  const result: ParamDirectory = {
    nameMap: {},
    transMap: {},
  }
  for(const nodeId of Object.getOwnPropertyNames(nodeMap)) {
    const node = nodeMap[nodeId];
    const params = definedOr(node.parameters, []);
    const names = [];
    for(let i = 0; i < params.length; i++) {
      names.push(assertDefined(params[i].name));
    }
    result.nameMap[nodeId] = names;
    if('file' in node) {
      addToTransMap(result.transMap, nodeMap, node, []);
    }
  }
  return result;
}

function addToTransMap(
  transMap: StrDict<TypeParamInfo[]>,
  nodeMap: NodeMap,
  node: schema.types_.Node.Reader,
  parentParams: TypeParamInfo[]): void {
    const parameters = definedOr(node.parameters, []);
    const newParams = [];
    for(let i = 0; i < parameters.length; i++) {
      const v = parameters[i];
      newParams.push({
        scopeId: node.id,
        index: i,
        name: assertDefined(v.name),
      })
    }
    const allParams = parentParams.concat(newParams);
    transMap[node.id] = allParams;

    for(const nestedNode of definedOr(node.nestedNodes, [])) {
      const next = nodeMap[nestedNode.id];
      if(next) {
        addToTransMap(transMap, nodeMap, next, allParams)
      }
    }
}

function handleCgr(cgr: schema.types_.CodeGeneratorRequest.Reader): CgrOutSpec {
  const nodeMap: NodeMap = {};
  const nodes = assertDefined(cgr.nodes);
  for(const node of nodes) {
    nodeMap[node.id] = node;
  }
  const paramDir = buildParamDirectory(nodeMap);
  const out: CgrOutSpec = {}
  for(const file of assertDefined(cgr.requestedFiles)) {
    out[assertDefined(file.filename)] = handleFile(nodeMap, paramDir, file)
  }
  return out;
}

function handleFile(
  nodeMap: NodeMap,
  paramDir: ParamDirectory,
  requestedFile: schema.types_.CodeGeneratorRequest.RequestedFile.Reader,
): FileOutSpec {
  const fileId = assertDefined(requestedFile.id);
  const fileNode = nodeMap[fileId];
  const ctx = {
    paramDir,
    nodeMap,
    thisFileId: fileId,
    typeParams: [],
  }
  const ns = handleNode(ctx, fileNode);
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

function handleField(ctx: SpecBuilderCtx, field: schema.types_.Field.Reader): FieldSpec {
  if('slot' in field) {
    return {
      name: assertDefined(field.name),
      type: makeTypeRef(ctx, assertDefined(field.slot.type)),
    };
  } else if('group' in field) {
    const groupId = assertDefined(field.group.typeId);
    const groupNode = assertDefined(ctx.nodeMap[groupId]);
    const groupSpec = handleNode(ctx, groupNode);
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

function handleNode(ctx: SpecBuilderCtx, node: schema.types_.Node.Reader): NodeOutSpec {
  const kids: StrDict<NodeOutSpec> = {};
  for(const nestedNode of node.nestedNodes || []) {
    const kid: schema.types_.Node.Reader = ctx.nodeMap[assertDefined(nestedNode.id)];
    kids[assertDefined(nestedNode.name)] = handleNode(ctx, kid);
  }
  const result: NodeOutSpec = {
    id: assertDefined(node.id),
    kids: assertDefined(kids),
    typeParams: definedOr(ctx.paramDir.transMap[node.id], []),
  }

  const noDiscrim = schema.Field.noDiscriminant;

  if('const' in node) {
    result.constant = makeTypeRef(ctx, assertDefined(node.const.type));
  } else if('struct' in node) {
    const unionFields: StrDict<FieldSpec[]> = {};
    unionFields[noDiscrim] = [];
    if('fields' in node.struct) {
      for(const field of assertDefined(node.struct.fields)) {
        const tag = assertDefined(field.discriminantValue);
        if(!(tag in unionFields)) {
          unionFields[tag] = [];
        }
        const fields = assertDefined(unionFields[tag]);
        fields.push(handleField(ctx, field))
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
      spec.superIds.push(typeById(ctx, supers[i].id, supers[i].brand));
    }
    for(let i = 0; i < methods.length; i++) {
      const method = assertDefined(methods[i]);
      spec.methods[assertDefined(method.name)] = {
        params: handleParamResult(ctx, method.paramStructType, method.paramBrand),
        results: handleParamResult(ctx, method.resultStructType, method.resultBrand),
      };
    }
    result.interface = spec;
  }
  return result;
}

function handleParamResult(ctx: SpecBuilderCtx, structId: NodeId, brand: schema.types_.Brand.Reader | undefined): ArgsOutSpec {
  const node = assertDefined(ctx.nodeMap[structId]);
  const fields = [];
  if(node.scopeId === '0') {
    if(!('struct' in node)) {
      throw new Error('parameter or result type was not a struct');
    }
    const fields = definedOr(node.struct.fields, []);
    const listed = [];
    for(let i = 0; i < fields.length; i++) {
      listed.push(handleField(ctx, fields[i]));
    }
    return { listed }
  } else {
    return { declared: { struct: typeById(ctx, structId, brand) } }
  }
}

function typeById(ctx: SpecBuilderCtx, typeId: NodeId, brand: schema.types_.Brand.Reader | undefined): TypeById {
  const typeParams = (brand === undefined)? [] : instantiateTypeParams(ctx, typeId, brand);
  const fileId = assertDefined(findNodeFile(typeId, ctx.nodeMap).id);
  if(fileId === ctx.thisFileId) {
    return { typeId, typeParams }
  } else {
    return { typeId, typeParams, fileId }
  }
}

function makeTypeRef(ctx: SpecBuilderCtx, typ: schema.types_.Type.Reader): TypeRef {
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
    return { list: makeTypeRef(ctx, assertDefined(typ.list.elementType)) }
  } else if('anyPointer' in typ) {
    const ptrType = typ.anyPointer;
    if('unconstrained' in ptrType) {
      const p = ptrType.unconstrained;
      if('capability' in p) {
        return "Capability";
      } else {
        return 'Buffer';
      }
    } else if('parameter' in ptrType) {
      // Treat as a regular anypointer for now; TODO: generics.
      const scope = ctx.nodeMap[assertDefined(ptrType.parameter.scopeId)];
      const index = assertDefined(ptrType.parameter.parameterIndex);
      const param = assertDefined(scope.parameters)[index];
      return { paramName: assertDefined(param.name) }
    } else {
      console.log("Unknown anyPointer variant: ", typ)
      throw new Error("Unknown anyPointer variant");
    }
  } else if('struct' in typ) {
    return { struct: typeById(ctx, typ.struct.typeId, typ.struct.brand) }
  } else if('enum' in typ) {
    return { enum: typeById(ctx, typ.enum.typeId, typ.enum.brand) }
  } else if('interface' in typ) {
    return { interface: typeById(ctx, typ.interface.typeId, typ.interface.brand) }
  } else {
    console.error("Unknown type: ", typ, "; can't make type ref.");
    throw new Error("Unknown type can't make type ref.");
  }
}

export function cgrToFileContents(cgr: schema.types_.CodeGeneratorRequest.Reader): StrDict<iolist.IoList> {
  return formatCgr(handleCgr(cgr));
}
