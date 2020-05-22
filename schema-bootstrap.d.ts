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
      fields?: Array<Field>;
    }

    type Choices$
      = { file: File }
      | { struct: Struct };
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

  export type Type
    = { void: null }
    | { bool: null }
    | { int8: null }
    | { int16: null }
    | { int32: null }
    | { int64: null }
    | { uint8: null }
    | { uint16: null }
    | { uint32: null }
    | { uint64: null }
    | { float32: null }
    | { float64: null }
    | { text: null }
    | { data: null }
    | { list: { elementType: Type } }
    ;

  export module Field$ {
    export interface Common$ {
      name?: string;
      codeOrder?: number;
      discriminantValue?: number;
      // TODO: annotations
    }

    export interface Slot {
      type?: Type;
      // TODO: other fields
    }

    export interface Group {
      typeId?: string;
    }

    export type Choices$
      = { slot: Slot }
      | { group: Group }
      ;
  }
  export type Field = Field$.Common$ & Field$.Choices$;

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
