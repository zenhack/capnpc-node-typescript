import capnp from 'capnp';
import schema from './schema-bootstrap.js';

import * as iolist from './iolist.js';

type StrDict<T> = { [k: string]: T }

type NodeMap = StrDict<schema.Node>

interface NodeOutSpec {
  id: string;
  kids: StrDict<NodeOutSpec>;
  struct?: StructOutSpec;
}

interface StructOutSpec {
}

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
    result.push([k, ': $Capnp.Schema<types_.', path.join('.'), '> & {\n']);
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
      ['export const ', name, ': $Capnp.Schema<types_.', path.join('.'), '> & {\n'],
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
  if('struct' in spec) {
    result.push([
      ['export interface ', name, ' {\n'],
      ['\n}\n'],
    ]);
  }
  if(body.length > 0) {
    result.push(['export module ', name, '{\n', body, '\n}\n']);
  }
  return result;
}

function formatFile(spec: NodeOutSpec): iolist.IoList {
  const types: iolist.IoList = [];
  const values: iolist.IoList = [];
  const keys = Object.getOwnPropertyNames(spec.kids);
  for(const k of keys) {
    types.push(formatTypes(k, ['types_', k], spec.kids[k]))
    values.push(formatValues(k, [k], spec.kids[k]))
  }
  return [
    'import $Capnp from "capnp";\n',
    'declare module $tmp {\n',
    'export module types_ {\n',
    types,
    '}\n',
    values,
    '\n}\n',
    'export default $tmp;',
  ]
}

interface CgrOutSpec {
  [file: string]: NodeOutSpec;
}

function formatCgr(cgr: CgrOutSpec): StrDict<iolist.IoList> {
  const result: StrDict<iolist.IoList> = {};
  for(const k of Object.getOwnPropertyNames(cgr)) {
    result[k + '.d.ts'] = formatFile(cgr[k]);
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
): NodeOutSpec {
  const fileNode = nodeMap[assertDefined(requestedFile.id)];
  const ns = handleNode(nodeMap, fileNode);
  return ns
}

function handleNode(nodeMap: NodeMap, node: schema.Node): NodeOutSpec {
  const kids: StrDict<NodeOutSpec> = {};
  for(const nestedNode of assertDefined(node.nestedNodes)) {
    const kid: schema.Node = nodeMap[assertDefined(nestedNode.id)];
    kids[assertDefined(nestedNode.name)] = handleNode(nodeMap, kid);
  }
  const result: NodeOutSpec = {
    id: assertDefined(node.id),
    kids: assertDefined(kids),
  }
  if('struct' in node) {
    result.struct = {};
  }
  return result;
}

export function cgrToFileContents(cgr: schema.CodeGeneratorRequest): StrDict<iolist.IoList>  {
  return formatCgr(handleCgr(cgr));
}
