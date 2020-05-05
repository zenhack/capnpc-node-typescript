import Capnp from 'capnp';

declare module Schema {

  export const CodeGeneratorRequest: Capnp.Schema<CodeGeneratorRequest>;

  export interface Node {
    id?: string;
    displayName?: string;
    nestedNodes?: Array<Node.NestedNode>;
  }

  export module Node {
    export interface NestedNode {
      id?: string;
      name?: string;
    }
  }

  export interface CodeGeneratorRequest {
    nodes?: Array<Node>;
    requestedFiles?: Array<CodeGeneratorRequest.RequestedFile>;
  }

  export module CodeGeneratorRequest {
    export interface RequestedFile {
      id?: string;
      filename?: string;
      imports?: Array<RequestedFile.Import>;
    }
    export module RequestedFile {
      export interface Import {
        id?: string;
        name?: string;
      }
    }
  }
}
export default Schema
