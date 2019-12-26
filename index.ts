'use strict';

const fs = require('fs');

const capnp = require('capnp');
const schema = capnp.importSystem('capnp/schema.capnp');

function handleCgr(cgr) {
  const nodeMap = {};
  for(const node of cgr.nodes) {
    nodeMap[node.id] = node;
  }

  for(const file of cgr.requestedFiles) {
    handleFile(nodeMap, file)
  }
}

function handleFile(nodeMap, requestedFile) {
  const fileNode = nodeMap[requestedFile.id];
  const ns = handleNode(nodeMap, fileNode);
  console.log(ns);
}

function handleNode(nodeMap, node) {
  const kids = {};
  for(const nestedNode of node.nestedNodes) {
    const kid = nodeMap[nestedNode.id];
    kids[nestedNode.name] = handleNode(nodeMap, kid);
  }
  return {
    id: node.id,
    kids,
  }
}

function main() {
  const buffer = fs.readFileSync('/dev/stdin');
  const cgr = capnp.parse(schema.CodeGeneratorRequest, buffer);
  handleCgr(cgr);
}

main();
