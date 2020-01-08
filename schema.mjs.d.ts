import { Schema } from './capnp.mjs';

declare const CodeGeneratorRequest: Schema<CodeGeneratorRequest>;

declare interface Node {
  id?: string;
  displayName?: string;
  nestedNodes?: Array<Node.NestedNode>;
}

declare module Node {
  interface NestedNode {
    id?: string;
    name?: string;
  }
}

declare interface CodeGeneratorRequest {
  nodes?: Array<Node>;
  requestedFiles?: Array<CodeGeneratorRequest.RequestedFile>;
}

declare module CodeGeneratorRequest {
  interface RequestedFile {
    id?: string;
    filename?: string;
    imports?: Array<RequestedFile.Import>;
  }
  module RequestedFile {
    interface Import {
      id?: string;
      name?: string;
    }
  }
}
