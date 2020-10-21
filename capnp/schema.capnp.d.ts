import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Node{
type Pos = { id: string;
displayName: string;
displayNamePrefixLength: string;
scopeId: string;
nestedNodes?: $16050641862814319170.Pos[];
annotations?: $17422339044421236034.Pos[];
parameters?: $13353766412138554289.Pos[];
isGeneric: boolean;
 } & ({ file: void;
 } | {struct: { dataWordCount: number;
pointerCount: number;
preferredListEncoding: $15102134695616452902.Pos;
isGroup: boolean;
discriminantCount: number;
discriminantOffset: string;
fields?: $11145653318641710175.Pos[];
 };
} | {enum: { enumerants?: $10919677598968879693.Pos[];
 };
} | {interface: { methods?: $10736806783679155584.Pos[];
superclasses?: $12220001500510083064.Pos[];
 };
} | {const: { type?: $15020482145304562784.Pos;
value?: $14853958794117909659.Pos;
 };
} | {annotation: { type?: $15020482145304562784.Pos;
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
type Reader = Pos;
type Neg = { id?: string;
displayName?: string;
displayNamePrefixLength?: string;
scopeId?: string;
nestedNodes?: $16050641862814319170.Neg[];
annotations?: $17422339044421236034.Neg[];
parameters?: $13353766412138554289.Neg[];
isGeneric?: boolean;
 } & ({ file?: void;
 } | {struct?: { dataWordCount?: number;
pointerCount?: number;
preferredListEncoding?: $15102134695616452902.Neg;
isGroup?: boolean;
discriminantCount?: number;
discriminantOffset?: string;
fields?: $11145653318641710175.Neg[];
 };
} | {enum?: { enumerants?: $10919677598968879693.Neg[];
 };
} | {interface?: { methods?: $10736806783679155584.Neg[];
superclasses?: $12220001500510083064.Neg[];
 };
} | {const?: { type?: $15020482145304562784.Neg;
value?: $14853958794117909659.Neg;
 };
} | {annotation?: { type?: $15020482145304562784.Neg;
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
type Builder = Neg;
export module Parameter{
type Pos = { name: string;
 }
type Reader = Pos;
type Neg = { name?: string;
 }
type Builder = Neg;

}
export module NestedNode{
type Pos = { name: string;
id: string;
 }
type Reader = Pos;
type Neg = { name?: string;
id?: string;
 }
type Builder = Neg;

}
export module SourceInfo{
type Pos = { id: string;
docComment: string;
members?: $14031686161526562722.Pos[];
 }
type Reader = Pos;
type Neg = { id?: string;
docComment?: string;
members?: $14031686161526562722.Neg[];
 }
type Builder = Neg;
export module Member{
type Pos = { docComment: string;
 }
type Reader = Pos;
type Neg = { docComment?: string;
 }
type Builder = Neg;

}

}

}
export module $16610026722781537303 {
export type Builder = types_.Node.Builder;
export type Reader = types_.Node.Reader;
export type Pos = types_.Node.Pos;
export type Neg = types_.Node.Neg;
}
export module $13353766412138554289 {
export type Builder = types_.Node.Parameter.Builder;
export type Reader = types_.Node.Parameter.Reader;
export type Pos = types_.Node.Parameter.Pos;
export type Neg = types_.Node.Parameter.Neg;
}
export module $16050641862814319170 {
export type Builder = types_.Node.NestedNode.Builder;
export type Reader = types_.Node.NestedNode.Reader;
export type Pos = types_.Node.NestedNode.Pos;
export type Neg = types_.Node.NestedNode.Neg;
}
export module $17549997658772559790 {
export type Builder = types_.Node.SourceInfo.Builder;
export type Reader = types_.Node.SourceInfo.Reader;
export type Pos = types_.Node.SourceInfo.Pos;
export type Neg = types_.Node.SourceInfo.Neg;
}
export module $14031686161526562722 {
export type Builder = types_.Node.SourceInfo.Member.Builder;
export type Reader = types_.Node.SourceInfo.Member.Reader;
export type Pos = types_.Node.SourceInfo.Member.Pos;
export type Neg = types_.Node.SourceInfo.Member.Neg;
}
export module Field{
type Pos = { name: string;
codeOrder: number;
annotations?: $17422339044421236034.Pos[];
discriminantValue: number;
ordinal: {  } & ({ implicit: void;
 } | {explicit: number;
} | {});
 } & ({ slot: { offset: string;
type?: $15020482145304562784.Pos;
defaultValue?: $14853958794117909659.Pos;
hadExplicitDefault: boolean;
 };
 } | {group: { typeId: string;
 };
} | {})
type Reader = Pos;
type Neg = { name?: string;
codeOrder?: number;
annotations?: $17422339044421236034.Neg[];
discriminantValue?: number;
ordinal?: {  } & ({ implicit?: void;
 } | {explicit?: number;
} | {});
 } & ({ slot?: { offset?: string;
type?: $15020482145304562784.Neg;
defaultValue?: $14853958794117909659.Neg;
hadExplicitDefault?: boolean;
 };
 } | {group?: { typeId?: string;
 };
} | {})
type Builder = Neg;
export module noDiscriminant{

}

}
export module $11145653318641710175 {
export type Builder = types_.Field.Builder;
export type Reader = types_.Field.Reader;
export type Pos = types_.Field.Pos;
export type Neg = types_.Field.Neg;
}
export module $10930602151629473554 {
}
export module Enumerant{
type Pos = { name: string;
codeOrder: number;
annotations?: $17422339044421236034.Pos[];
 }
type Reader = Pos;
type Neg = { name?: string;
codeOrder?: number;
annotations?: $17422339044421236034.Neg[];
 }
type Builder = Neg;

}
export module $10919677598968879693 {
export type Builder = types_.Enumerant.Builder;
export type Reader = types_.Enumerant.Reader;
export type Pos = types_.Enumerant.Pos;
export type Neg = types_.Enumerant.Neg;
}
export module Superclass{
type Pos = { id: string;
brand?: $10391024731148337707.Pos;
 }
type Reader = Pos;
type Neg = { id?: string;
brand?: $10391024731148337707.Neg;
 }
type Builder = Neg;

}
export module $12220001500510083064 {
export type Builder = types_.Superclass.Builder;
export type Reader = types_.Superclass.Reader;
export type Pos = types_.Superclass.Pos;
export type Neg = types_.Superclass.Neg;
}
export module Method{
type Pos = { name: string;
codeOrder: number;
paramStructType: string;
resultStructType: string;
annotations?: $17422339044421236034.Pos[];
paramBrand?: $10391024731148337707.Pos;
resultBrand?: $10391024731148337707.Pos;
implicitParameters?: $13353766412138554289.Pos[];
 }
type Reader = Pos;
type Neg = { name?: string;
codeOrder?: number;
paramStructType?: string;
resultStructType?: string;
annotations?: $17422339044421236034.Neg[];
paramBrand?: $10391024731148337707.Neg;
resultBrand?: $10391024731148337707.Neg;
implicitParameters?: $13353766412138554289.Neg[];
 }
type Builder = Neg;

}
export module $10736806783679155584 {
export type Builder = types_.Method.Builder;
export type Reader = types_.Method.Reader;
export type Pos = types_.Method.Pos;
export type Neg = types_.Method.Neg;
}
export module Type{
type Pos = {  } & ({ void: void;
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
} | {list: { elementType?: $15020482145304562784.Pos;
 };
} | {enum: { typeId: string;
brand?: $10391024731148337707.Pos;
 };
} | {struct: { typeId: string;
brand?: $10391024731148337707.Pos;
 };
} | {interface: { typeId: string;
brand?: $10391024731148337707.Pos;
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
type Reader = Pos;
type Neg = {  } & ({ void?: void;
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
} | {list?: { elementType?: $15020482145304562784.Neg;
 };
} | {enum?: { typeId?: string;
brand?: $10391024731148337707.Neg;
 };
} | {struct?: { typeId?: string;
brand?: $10391024731148337707.Neg;
 };
} | {interface?: { typeId?: string;
brand?: $10391024731148337707.Neg;
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
type Builder = Neg;

}
export module $15020482145304562784 {
export type Builder = types_.Type.Builder;
export type Reader = types_.Type.Reader;
export type Pos = types_.Type.Pos;
export type Neg = types_.Type.Neg;
}
export module Brand{
type Pos = { scopes?: $12382423449155627977.Pos[];
 }
type Reader = Pos;
type Neg = { scopes?: $12382423449155627977.Neg[];
 }
type Builder = Neg;
export module Scope{
type Pos = { scopeId: string;
 } & ({ bind?: $14439610327179913212.Pos[];
 } | {inherit: void;
} | {})
type Reader = Pos;
type Neg = { scopeId?: string;
 } & ({ bind?: $14439610327179913212.Neg[];
 } | {inherit?: void;
} | {})
type Builder = Neg;

}
export module Binding{
type Pos = {  } & ({ unbound: void;
 } | {type?: $15020482145304562784.Pos;
} | {})
type Reader = Pos;
type Neg = {  } & ({ unbound?: void;
 } | {type?: $15020482145304562784.Neg;
} | {})
type Builder = Neg;

}

}
export module $10391024731148337707 {
export type Builder = types_.Brand.Builder;
export type Reader = types_.Brand.Reader;
export type Pos = types_.Brand.Pos;
export type Neg = types_.Brand.Neg;
}
export module $12382423449155627977 {
export type Builder = types_.Brand.Scope.Builder;
export type Reader = types_.Brand.Scope.Reader;
export type Pos = types_.Brand.Scope.Pos;
export type Neg = types_.Brand.Scope.Neg;
}
export module $14439610327179913212 {
export type Builder = types_.Brand.Binding.Builder;
export type Reader = types_.Brand.Binding.Reader;
export type Pos = types_.Brand.Binding.Pos;
export type Neg = types_.Brand.Binding.Neg;
}
export module Value{
type Pos = {  } & ({ void: void;
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
} | {data?: Buffer;
} | {list?: Buffer;
} | {enum: number;
} | {struct?: Buffer;
} | {interface: void;
} | {anyPointer?: Buffer;
} | {})
type Reader = Pos;
type Neg = {  } & ({ void?: void;
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
type Builder = Neg;

}
export module $14853958794117909659 {
export type Builder = types_.Value.Builder;
export type Reader = types_.Value.Reader;
export type Pos = types_.Value.Pos;
export type Neg = types_.Value.Neg;
}
export module Annotation{
type Pos = { id: string;
value?: $14853958794117909659.Pos;
brand?: $10391024731148337707.Pos;
 }
type Reader = Pos;
type Neg = { id?: string;
value?: $14853958794117909659.Neg;
brand?: $10391024731148337707.Neg;
 }
type Builder = Neg;

}
export module $17422339044421236034 {
export type Builder = types_.Annotation.Builder;
export type Reader = types_.Annotation.Reader;
export type Pos = types_.Annotation.Pos;
export type Neg = types_.Annotation.Neg;
}
export module ElementSize{
type Pos =  | "empty" | "bit" | "byte" | "twoBytes" | "fourBytes" | "eightBytes" | "pointer" | "inlineComposite" | number;
type Reader = Pos;
type Neg =  | "empty" | "bit" | "byte" | "twoBytes" | "fourBytes" | "eightBytes" | "pointer" | "inlineComposite";
type Builder = Neg;

}
export module $15102134695616452902 {
export type Builder = types_.ElementSize.Builder;
export type Reader = types_.ElementSize.Reader;
export type Pos = types_.ElementSize.Pos;
export type Neg = types_.ElementSize.Neg;
}
export module CapnpVersion{
type Pos = { major: number;
minor: number;
micro: number;
 }
type Reader = Pos;
type Neg = { major?: number;
minor?: number;
micro?: number;
 }
type Builder = Neg;

}
export module $15590670654532458851 {
export type Builder = types_.CapnpVersion.Builder;
export type Reader = types_.CapnpVersion.Reader;
export type Pos = types_.CapnpVersion.Pos;
export type Neg = types_.CapnpVersion.Neg;
}
export module CodeGeneratorRequest{
type Pos = { nodes?: $16610026722781537303.Pos[];
requestedFiles?: $14981803260258615394.Pos[];
capnpVersion?: $15590670654532458851.Pos;
sourceInfo?: $17549997658772559790.Pos[];
 }
type Reader = Pos;
type Neg = { nodes?: $16610026722781537303.Neg[];
requestedFiles?: $14981803260258615394.Neg[];
capnpVersion?: $15590670654532458851.Neg;
sourceInfo?: $17549997658772559790.Neg[];
 }
type Builder = Neg;
export module RequestedFile{
type Pos = { id: string;
filename: string;
imports?: $12560611460656617445.Pos[];
 }
type Reader = Pos;
type Neg = { id?: string;
filename?: string;
imports?: $12560611460656617445.Neg[];
 }
type Builder = Neg;
export module Import{
type Pos = { id: string;
name: string;
 }
type Reader = Pos;
type Neg = { id?: string;
name?: string;
 }
type Builder = Neg;

}

}

}
export module $13818529054586492878 {
export type Builder = types_.CodeGeneratorRequest.Builder;
export type Reader = types_.CodeGeneratorRequest.Reader;
export type Pos = types_.CodeGeneratorRequest.Pos;
export type Neg = types_.CodeGeneratorRequest.Neg;
}
export module $14981803260258615394 {
export type Builder = types_.CodeGeneratorRequest.RequestedFile.Builder;
export type Reader = types_.CodeGeneratorRequest.RequestedFile.Reader;
export type Pos = types_.CodeGeneratorRequest.RequestedFile.Pos;
export type Neg = types_.CodeGeneratorRequest.RequestedFile.Neg;
}
export module $12560611460656617445 {
export type Builder = types_.CodeGeneratorRequest.RequestedFile.Import.Builder;
export type Reader = types_.CodeGeneratorRequest.RequestedFile.Import.Reader;
export type Pos = types_.CodeGeneratorRequest.RequestedFile.Import.Pos;
export type Neg = types_.CodeGeneratorRequest.RequestedFile.Import.Neg;
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