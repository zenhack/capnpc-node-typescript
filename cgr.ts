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


function formatChild(name: string, spec: NodeOutSpec, isRoot: boolean): iolist.IoList {
  let rootItem: (item: iolist.IoList) => iolist.IoList;
  if(isRoot) {
    rootItem = (item) => ['declare ', item]
  } else {
    rootItem = (item) => item
  }

  const body = [];
  for(const k of Object.getOwnPropertyNames(spec.kids)) {
    body.push(formatChild(k, spec.kids[k], false));
  }

  const result = [];
  if(body.length > 0) {
    result.push(rootItem(['module ', name, '{\n', body, '\n}\n']));
  }
  if('struct' in spec) {
    result.push(rootItem([
      ['type ', name, ' = {\n'],
      ['\n}\n'],
    ]));
    result.push(rootItem(
      ['const ', name, ': $Capnp.Schema<', name, '>;\n']
    ));
  }
  return result;
}

function formatFile(spec: NodeOutSpec): iolist.IoList {
  const result: iolist.IoList = [
    'import $Capnp from "capnp";\n'
  ];
  const keys = Object.getOwnPropertyNames(spec.kids);
  for(const k of keys) {
    result.push(formatChild(k, spec.kids[k], true))
  }
  return result;
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
