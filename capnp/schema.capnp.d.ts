import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Node{
type Builder = { id?: string;
displayName?: string;
displayNamePrefixLength?: string;
scopeId?: string;
nestedNodes?: $16050641862814319170.Builder[];
annotations?: $17422339044421236034.Builder[];
parameters?: $13353766412138554289.Builder[];
isGeneric?: boolean;
 } & ({ file?: void;
 } | {struct?: { dataWordCount?: number;
pointerCount?: number;
preferredListEncoding?: $15102134695616452902.Builder;
isGroup?: boolean;
discriminantCount?: number;
discriminantOffset?: string;
fields?: $11145653318641710175.Builder[];
 };
} | {enum?: { enumerants?: $10919677598968879693.Builder[];
 };
} | {interface?: { methods?: $10736806783679155584.Builder[];
superclasses?: $12220001500510083064.Builder[];
 };
} | {const?: { type?: $15020482145304562784.Builder;
value?: $14853958794117909659.Builder;
 };
} | {annotation?: { type?: $15020482145304562784.Builder;
targetsFile?: boolean;
targetsConst?: boolean;
targetsEnum?: boolean;
targetsEnumerant?: boolean;
targetsStruct?: boolean;
targetsField?: boolean;
targetsUnion?: boolean;
targetsGroup?: boolean;
targetsInterface?: boolean;
targetsMethod?: boolean;
targetsParam?: boolean;
targetsAnnotation?: boolean;
 };
} | {})
type Reader = { id: string;
displayName: string;
displayNamePrefixLength: string;
scopeId: string;
nestedNodes: $16050641862814319170.Reader[];
annotations: $17422339044421236034.Reader[];
parameters: $13353766412138554289.Reader[];
isGeneric: boolean;
 } & ({ file: void;
 } | {struct: { dataWordCount: number;
pointerCount: number;
preferredListEncoding: $15102134695616452902.Reader;
isGroup: boolean;
discriminantCount: number;
discriminantOffset: string;
fields: $11145653318641710175.Reader[];
 };
} | {enum: { enumerants: $10919677598968879693.Reader[];
 };
} | {interface: { methods: $10736806783679155584.Reader[];
superclasses: $12220001500510083064.Reader[];
 };
} | {const: { type: $15020482145304562784.Reader;
value: $14853958794117909659.Reader;
 };
} | {annotation: { type: $15020482145304562784.Reader;
targetsFile: boolean;
targetsConst: boolean;
targetsEnum: boolean;
targetsEnumerant: boolean;
targetsStruct: boolean;
targetsField: boolean;
targetsUnion: boolean;
targetsGroup: boolean;
targetsInterface: boolean;
targetsMethod: boolean;
targetsParam: boolean;
targetsAnnotation: boolean;
 };
} | {})
export module Parameter{
type Builder = { name?: string;
 }
type Reader = { name: string;
 }

}
export module NestedNode{
type Builder = { name?: string;
id?: string;
 }
type Reader = { name: string;
id: string;
 }

}
export module SourceInfo{
type Builder = { id?: string;
docComment?: string;
members?: $14031686161526562722.Builder[];
 }
type Reader = { id: string;
docComment: string;
members: $14031686161526562722.Reader[];
 }
export module Member{
type Builder = { docComment?: string;
 }
type Reader = { docComment: string;
 }

}

}

}
export module $16610026722781537303 {
export type Builder = types_.Node.Builder;
export type Reader = types_.Node.Reader;
}
export module $13353766412138554289 {
export type Builder = types_.Node.Parameter.Builder;
export type Reader = types_.Node.Parameter.Reader;
}
export module $16050641862814319170 {
export type Builder = types_.Node.NestedNode.Builder;
export type Reader = types_.Node.NestedNode.Reader;
}
export module $17549997658772559790 {
export type Builder = types_.Node.SourceInfo.Builder;
export type Reader = types_.Node.SourceInfo.Reader;
}
export module $14031686161526562722 {
export type Builder = types_.Node.SourceInfo.Member.Builder;
export type Reader = types_.Node.SourceInfo.Member.Reader;
}
export module Field{
type Builder = { name?: string;
codeOrder?: number;
annotations?: $17422339044421236034.Builder[];
discriminantValue?: number;
ordinal?: {  } & ({ implicit?: void;
 } | {explicit?: number;
} | {});
 } & ({ slot?: { offset?: string;
type?: $15020482145304562784.Builder;
defaultValue?: $14853958794117909659.Builder;
hadExplicitDefault?: boolean;
 };
 } | {group?: { typeId?: string;
 };
} | {})
type Reader = { name: string;
codeOrder: number;
annotations: $17422339044421236034.Reader[];
discriminantValue: number;
ordinal: {  } & ({ implicit: void;
 } | {explicit: number;
} | {});
 } & ({ slot: { offset: string;
type: $15020482145304562784.Reader;
defaultValue: $14853958794117909659.Reader;
hadExplicitDefault: boolean;
 };
 } | {group: { typeId: string;
 };
} | {})
export module noDiscriminant{

}

}
export module $11145653318641710175 {
export type Builder = types_.Field.Builder;
export type Reader = types_.Field.Reader;
}
export module $10930602151629473554 {
}
export module Enumerant{
type Builder = { name?: string;
codeOrder?: number;
annotations?: $17422339044421236034.Builder[];
 }
type Reader = { name: string;
codeOrder: number;
annotations: $17422339044421236034.Reader[];
 }

}
export module $10919677598968879693 {
export type Builder = types_.Enumerant.Builder;
export type Reader = types_.Enumerant.Reader;
}
export module Superclass{
type Builder = { id?: string;
brand?: $10391024731148337707.Builder;
 }
type Reader = { id: string;
brand: $10391024731148337707.Reader;
 }

}
export module $12220001500510083064 {
export type Builder = types_.Superclass.Builder;
export type Reader = types_.Superclass.Reader;
}
export module Method{
type Builder = { name?: string;
codeOrder?: number;
paramStructType?: string;
resultStructType?: string;
annotations?: $17422339044421236034.Builder[];
paramBrand?: $10391024731148337707.Builder;
resultBrand?: $10391024731148337707.Builder;
implicitParameters?: $13353766412138554289.Builder[];
 }
type Reader = { name: string;
codeOrder: number;
paramStructType: string;
resultStructType: string;
annotations: $17422339044421236034.Reader[];
paramBrand: $10391024731148337707.Reader;
resultBrand: $10391024731148337707.Reader;
implicitParameters: $13353766412138554289.Reader[];
 }

}
export module $10736806783679155584 {
export type Builder = types_.Method.Builder;
export type Reader = types_.Method.Reader;
}
export module Type{
type Builder = {  } & ({ void?: void;
 } | {bool?: void;
} | {int8?: void;
} | {int16?: void;
} | {int32?: void;
} | {int64?: void;
} | {uint8?: void;
} | {uint16?: void;
} | {uint32?: void;
} | {uint64?: void;
} | {float32?: void;
} | {float64?: void;
} | {text?: void;
} | {data?: void;
} | {list?: { elementType?: $15020482145304562784.Builder;
 };
} | {enum?: { typeId?: string;
brand?: $10391024731148337707.Builder;
 };
} | {struct?: { typeId?: string;
brand?: $10391024731148337707.Builder;
 };
} | {interface?: { typeId?: string;
brand?: $10391024731148337707.Builder;
 };
} | {anyPointer?: {  } & ({ unconstrained?: {  } & ({ anyKind?: void;
 } | {struct?: void;
} | {list?: void;
} | {capability?: void;
} | {});
 } | {parameter?: { scopeId?: string;
parameterIndex?: number;
 };
} | {implicitMethodParameter?: { parameterIndex?: number;
 };
} | {});
} | {})
type Reader = {  } & ({ void: void;
 } | {bool: void;
} | {int8: void;
} | {int16: void;
} | {int32: void;
} | {int64: void;
} | {uint8: void;
} | {uint16: void;
} | {uint32: void;
} | {uint64: void;
} | {float32: void;
} | {float64: void;
} | {text: void;
} | {data: void;
} | {list: { elementType: $15020482145304562784.Reader;
 };
} | {enum: { typeId: string;
brand: $10391024731148337707.Reader;
 };
} | {struct: { typeId: string;
brand: $10391024731148337707.Reader;
 };
} | {interface: { typeId: string;
brand: $10391024731148337707.Reader;
 };
} | {anyPointer: {  } & ({ unconstrained: {  } & ({ anyKind: void;
 } | {struct: void;
} | {list: void;
} | {capability: void;
} | {});
 } | {parameter: { scopeId: string;
parameterIndex: number;
 };
} | {implicitMethodParameter: { parameterIndex: number;
 };
} | {});
} | {})

}
export module $15020482145304562784 {
export type Builder = types_.Type.Builder;
export type Reader = types_.Type.Reader;
}
export module Brand{
type Builder = { scopes?: $12382423449155627977.Builder[];
 }
type Reader = { scopes: $12382423449155627977.Reader[];
 }
export module Scope{
type Builder = { scopeId?: string;
 } & ({ bind?: $14439610327179913212.Builder[];
 } | {inherit?: void;
} | {})
type Reader = { scopeId: string;
 } & ({ bind: $14439610327179913212.Reader[];
 } | {inherit: void;
} | {})

}
export module Binding{
type Builder = {  } & ({ unbound?: void;
 } | {type?: $15020482145304562784.Builder;
} | {})
type Reader = {  } & ({ unbound: void;
 } | {type: $15020482145304562784.Reader;
} | {})

}

}
export module $10391024731148337707 {
export type Builder = types_.Brand.Builder;
export type Reader = types_.Brand.Reader;
}
export module $12382423449155627977 {
export type Builder = types_.Brand.Scope.Builder;
export type Reader = types_.Brand.Scope.Reader;
}
export module $14439610327179913212 {
export type Builder = types_.Brand.Binding.Builder;
export type Reader = types_.Brand.Binding.Reader;
}
export module Value{
type Builder = {  } & ({ void?: void;
 } | {bool?: boolean;
} | {int8?: number;
} | {int16?: number;
} | {int32?: number;
} | {int64?: string;
} | {uint8?: number;
} | {uint16?: number;
} | {uint32?: string;
} | {uint64?: string;
} | {float32?: number;
} | {float64?: number;
} | {text?: string;
} | {data?: Buffer;
} | {list?: Buffer;
} | {enum?: number;
} | {struct?: Buffer;
} | {interface?: void;
} | {anyPointer?: Buffer;
} | {})
type Reader = {  } & ({ void: void;
 } | {bool: boolean;
} | {int8: number;
} | {int16: number;
} | {int32: number;
} | {int64: string;
} | {uint8: number;
} | {uint16: number;
} | {uint32: string;
} | {uint64: string;
} | {float32: number;
} | {float64: number;
} | {text: string;
} | {data: Buffer;
} | {list: Buffer;
} | {enum: number;
} | {struct: Buffer;
} | {interface: void;
} | {anyPointer: Buffer;
} | {})

}
export module $14853958794117909659 {
export type Builder = types_.Value.Builder;
export type Reader = types_.Value.Reader;
}
export module Annotation{
type Builder = { id?: string;
value?: $14853958794117909659.Builder;
brand?: $10391024731148337707.Builder;
 }
type Reader = { id: string;
value: $14853958794117909659.Reader;
brand: $10391024731148337707.Reader;
 }

}
export module $17422339044421236034 {
export type Builder = types_.Annotation.Builder;
export type Reader = types_.Annotation.Reader;
}
export module ElementSize{
type Builder =  | "empty" | "bit" | "byte" | "twoBytes" | "fourBytes" | "eightBytes" | "pointer" | "inlineComposite";
type Reader =  | "empty" | "bit" | "byte" | "twoBytes" | "fourBytes" | "eightBytes" | "pointer" | "inlineComposite" | number;

}
export module $15102134695616452902 {
export type Builder = types_.ElementSize.Builder;
export type Reader = types_.ElementSize.Reader;
}
export module CapnpVersion{
type Builder = { major?: number;
minor?: number;
micro?: number;
 }
type Reader = { major: number;
minor: number;
micro: number;
 }

}
export module $15590670654532458851 {
export type Builder = types_.CapnpVersion.Builder;
export type Reader = types_.CapnpVersion.Reader;
}
export module CodeGeneratorRequest{
type Builder = { nodes?: $16610026722781537303.Builder[];
requestedFiles?: $14981803260258615394.Builder[];
capnpVersion?: $15590670654532458851.Builder;
sourceInfo?: $17549997658772559790.Builder[];
 }
type Reader = { nodes: $16610026722781537303.Reader[];
requestedFiles: $14981803260258615394.Reader[];
capnpVersion: $15590670654532458851.Reader;
sourceInfo: $17549997658772559790.Reader[];
 }
export module RequestedFile{
type Builder = { id?: string;
filename?: string;
imports?: $12560611460656617445.Builder[];
 }
type Reader = { id: string;
filename: string;
imports: $12560611460656617445.Reader[];
 }
export module Import{
type Builder = { id?: string;
name?: string;
 }
type Reader = { id: string;
name: string;
 }

}

}

}
export module $13818529054586492878 {
export type Builder = types_.CodeGeneratorRequest.Builder;
export type Reader = types_.CodeGeneratorRequest.Reader;
}
export module $14981803260258615394 {
export type Builder = types_.CodeGeneratorRequest.RequestedFile.Builder;
export type Reader = types_.CodeGeneratorRequest.RequestedFile.Reader;
}
export module $12560611460656617445 {
export type Builder = types_.CodeGeneratorRequest.RequestedFile.Import.Builder;
export type Reader = types_.CodeGeneratorRequest.RequestedFile.Import.Reader;
}
}
export const Node: $Capnp.StructSchema<types_.Node.Reader, types_.Node.Builder> & {
Parameter: $Capnp.StructSchema<types_.Node.Parameter.Reader, types_.Node.Parameter.Builder> & {
},
NestedNode: $Capnp.StructSchema<types_.Node.NestedNode.Reader, types_.Node.NestedNode.Builder> & {
},
SourceInfo: $Capnp.StructSchema<types_.Node.SourceInfo.Reader, types_.Node.SourceInfo.Builder> & {
Member: $Capnp.StructSchema<types_.Node.SourceInfo.Member.Reader, types_.Node.SourceInfo.Member.Builder> & {
},
},
};
export const Field: $Capnp.StructSchema<types_.Field.Reader, types_.Field.Builder> & {
};
export const Enumerant: $Capnp.StructSchema<types_.Enumerant.Reader, types_.Enumerant.Builder> & {
};
export const Superclass: $Capnp.StructSchema<types_.Superclass.Reader, types_.Superclass.Builder> & {
};
export const Method: $Capnp.StructSchema<types_.Method.Reader, types_.Method.Builder> & {
};
export const Type: $Capnp.StructSchema<types_.Type.Reader, types_.Type.Builder> & {
};
export const Brand: $Capnp.StructSchema<types_.Brand.Reader, types_.Brand.Builder> & {
Scope: $Capnp.StructSchema<types_.Brand.Scope.Reader, types_.Brand.Scope.Builder> & {
},
Binding: $Capnp.StructSchema<types_.Brand.Binding.Reader, types_.Brand.Binding.Builder> & {
},
};
export const Value: $Capnp.StructSchema<types_.Value.Reader, types_.Value.Builder> & {
};
export const Annotation: $Capnp.StructSchema<types_.Annotation.Reader, types_.Annotation.Builder> & {
};
export const CapnpVersion: $Capnp.StructSchema<types_.CapnpVersion.Reader, types_.CapnpVersion.Builder> & {
};
export const CodeGeneratorRequest: $Capnp.StructSchema<types_.CodeGeneratorRequest.Reader, types_.CodeGeneratorRequest.Builder> & {
RequestedFile: $Capnp.StructSchema<types_.CodeGeneratorRequest.RequestedFile.Reader, types_.CodeGeneratorRequest.RequestedFile.Builder> & {
Import: $Capnp.StructSchema<types_.CodeGeneratorRequest.RequestedFile.Import.Reader, types_.CodeGeneratorRequest.RequestedFile.Import.Builder> & {
},
},
};

}
export default $tmp;