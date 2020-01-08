import * as fs from 'fs';

import * as capnp from './capnp.mjs';
import * as schema from './schema.mjs';

import * as iolist from './iolist';

type StrDict<T> = { [k: string]: T }

type NodeMap = StrDict<schema.Node>

interface NodeOutSpec {
  id: string;
  kids: StrDict<NodeOutSpec>;
}

function assertDefined<T>(arg: T | undefined): T {
  if(arg === undefined) {
    throw new Error('Undefined.');
  }
  return arg;
}


function formatNode(spec: NodeOutSpec, isRoot: boolean): iolist.IoList {
  const result: iolist.IoList = [];
  const keys = Object.getOwnPropertyNames(spec.kids);
  for(const k of keys) {
    const body = formatNode(spec.kids[k], false);
    const mod = ['module ', k, ' {\n', body, '\n}\n']
    if(isRoot) {
      result.push(['declare ', mod]);
    } else {
      result.push(mod);
    }
  }
  return result;
}

interface CgrOutSpec {
  [file: string]: NodeOutSpec;
}

function formatCgr(cgr: CgrOutSpec): StrDict<iolist.IoList> {
  const result: StrDict<iolist.IoList> = {};
  for(const k of Object.getOwnPropertyNames(cgr)) {
    result[k + '.d.ts'] = formatNode(cgr[k], true);
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
  return {
    id: assertDefined(node.id),
    kids: assertDefined(kids),
  }
}

function main() {
  const buffer: Buffer = fs.readFileSync('/dev/stdin');
  const cgr: schema.CodeGeneratorRequest = capnp.parse(schema.CodeGeneratorRequest, buffer);
  const spec = handleCgr(cgr);
  const fileContents = formatCgr(spec);
  for(const path of Object.getOwnPropertyNames(fileContents)) {
    iolist.writeFile(path, fileContents[path]);
  }
}

main();
