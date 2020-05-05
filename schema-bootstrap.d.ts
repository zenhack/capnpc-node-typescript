import Capnp from 'capnp';

declare module Schema {

  export const CodeGeneratorRequest: Capnp.Schema<CodeGeneratorRequest>;

  export module Node$ {
    export interface Common$ {
      id?: string;
      displayName?: string;
      displayNamePrefixLength?: string;
      nestedNodes?: Array<Node.NestedNode>;
      parameters?: Array<Node.Parameter>;
      isGeneric?: boolean;
      scopeId?: string;
    }

    export interface File {
    }

    export interface Struct {
      dataWordCount?: number;
      pointerCount?: number;
    }

    type Choices$ = File | Struct;
  }
  export type Node = Node$.Common$ & Node$.Choices$;

  export module Node {
    export interface NestedNode {
      id?: string;
      name?: string;
    }

    export interface Parameter {
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
