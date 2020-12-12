import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Message{
type Pos = {  } & ({ unimplemented?: $10500036013887172658.Pos;
 } | {abort?: $15430940935639230746.Pos;
} | {call?: $9469473312751832276.Pos;
} | {return?: $11392333052105676602.Pos;
} | {finish?: $15239388059401719395.Pos;
} | {resolve?: $13529541526594062446.Pos;
} | {release?: $12473400923157197975.Pos;
} | {obsoleteSave?: Buffer;
} | {bootstrap?: $16811039658553601732.Pos;
} | {obsoleteDelete?: Buffer;
} | {provide?: $11270825879279873114.Pos;
} | {accept?: $15332985841292492822.Pos;
} | {join?: $18149955118657700271.Pos;
} | {disembargo?: $17970548384007534353.Pos;
} | {})
type Reader = Pos;
type Neg = {  } & ({ unimplemented?: $10500036013887172658.Neg;
 } | {abort?: $15430940935639230746.Neg;
} | {call?: $9469473312751832276.Neg;
} | {return?: $11392333052105676602.Neg;
} | {finish?: $15239388059401719395.Neg;
} | {resolve?: $13529541526594062446.Neg;
} | {release?: $12473400923157197975.Neg;
} | {obsoleteSave?: Buffer;
} | {bootstrap?: $16811039658553601732.Neg;
} | {obsoleteDelete?: Buffer;
} | {provide?: $11270825879279873114.Neg;
} | {accept?: $15332985841292492822.Neg;
} | {join?: $18149955118657700271.Neg;
} | {disembargo?: $17970548384007534353.Neg;
} | {})
type Builder = Neg;

}
export module $10500036013887172658 {
export type Builder = types_.Message.Builder;
export type Reader = types_.Message.Reader;
export type Pos = types_.Message.Pos;
export type Neg = types_.Message.Neg;
}
export module Bootstrap{
type Pos = { questionId: string;
deprecatedObjectId?: Buffer;
 }
type Reader = Pos;
type Neg = { questionId?: string;
deprecatedObjectId?: Buffer;
 }
type Builder = Neg;

}
export module $16811039658553601732 {
export type Builder = types_.Bootstrap.Builder;
export type Reader = types_.Bootstrap.Reader;
export type Pos = types_.Bootstrap.Pos;
export type Neg = types_.Bootstrap.Neg;
}
export module Call{
type Pos = { questionId: string;
target?: $10789521159760378817.Pos;
interfaceId: string;
methodId: number;
params?: $11100916931204903995.Pos;
sendResultsTo: {  } & ({ caller: void;
 } | {yourself: void;
} | {thirdParty?: Buffer;
} | {});
allowThirdPartyTailCall: boolean;
 }
type Reader = Pos;
type Neg = { questionId?: string;
target?: $10789521159760378817.Neg;
interfaceId?: string;
methodId?: number;
params?: $11100916931204903995.Neg;
sendResultsTo?: {  } & ({ caller?: void;
 } | {yourself?: void;
} | {thirdParty?: Buffer;
} | {});
allowThirdPartyTailCall?: boolean;
 }
type Builder = Neg;

}
export module $9469473312751832276 {
export type Builder = types_.Call.Builder;
export type Reader = types_.Call.Reader;
export type Pos = types_.Call.Pos;
export type Neg = types_.Call.Neg;
}
export module Return{
type Pos = { answerId: string;
releaseParamCaps: boolean;
 } & ({ results?: $11100916931204903995.Pos;
 } | {exception?: $15430940935639230746.Pos;
} | {canceled: void;
} | {resultsSentElsewhere: void;
} | {takeFromOtherQuestion: string;
} | {acceptFromThirdParty?: Buffer;
} | {})
type Reader = Pos;
type Neg = { answerId?: string;
releaseParamCaps?: boolean;
 } & ({ results?: $11100916931204903995.Neg;
 } | {exception?: $15430940935639230746.Neg;
} | {canceled?: void;
} | {resultsSentElsewhere?: void;
} | {takeFromOtherQuestion?: string;
} | {acceptFromThirdParty?: Buffer;
} | {})
type Builder = Neg;

}
export module $11392333052105676602 {
export type Builder = types_.Return.Builder;
export type Reader = types_.Return.Reader;
export type Pos = types_.Return.Pos;
export type Neg = types_.Return.Neg;
}
export module Finish{
type Pos = { questionId: string;
releaseResultCaps: boolean;
 }
type Reader = Pos;
type Neg = { questionId?: string;
releaseResultCaps?: boolean;
 }
type Builder = Neg;

}
export module $15239388059401719395 {
export type Builder = types_.Finish.Builder;
export type Reader = types_.Finish.Reader;
export type Pos = types_.Finish.Pos;
export type Neg = types_.Finish.Neg;
}
export module Resolve{
type Pos = { promiseId: string;
 } & ({ cap?: $9593755465305995440.Pos;
 } | {exception?: $15430940935639230746.Pos;
} | {})
type Reader = Pos;
type Neg = { promiseId?: string;
 } & ({ cap?: $9593755465305995440.Neg;
 } | {exception?: $15430940935639230746.Neg;
} | {})
type Builder = Neg;

}
export module $13529541526594062446 {
export type Builder = types_.Resolve.Builder;
export type Reader = types_.Resolve.Reader;
export type Pos = types_.Resolve.Pos;
export type Neg = types_.Resolve.Neg;
}
export module Release{
type Pos = { id: string;
referenceCount: string;
 }
type Reader = Pos;
type Neg = { id?: string;
referenceCount?: string;
 }
type Builder = Neg;

}
export module $12473400923157197975 {
export type Builder = types_.Release.Builder;
export type Reader = types_.Release.Reader;
export type Pos = types_.Release.Pos;
export type Neg = types_.Release.Neg;
}
export module Disembargo{
type Pos = { target?: $10789521159760378817.Pos;
context: {  } & ({ senderLoopback: string;
 } | {receiverLoopback: string;
} | {accept: void;
} | {provide: string;
} | {});
 }
type Reader = Pos;
type Neg = { target?: $10789521159760378817.Neg;
context?: {  } & ({ senderLoopback?: string;
 } | {receiverLoopback?: string;
} | {accept?: void;
} | {provide?: string;
} | {});
 }
type Builder = Neg;

}
export module $17970548384007534353 {
export type Builder = types_.Disembargo.Builder;
export type Reader = types_.Disembargo.Reader;
export type Pos = types_.Disembargo.Pos;
export type Neg = types_.Disembargo.Neg;
}
export module Provide{
type Pos = { questionId: string;
target?: $10789521159760378817.Pos;
recipient?: Buffer;
 }
type Reader = Pos;
type Neg = { questionId?: string;
target?: $10789521159760378817.Neg;
recipient?: Buffer;
 }
type Builder = Neg;

}
export module $11270825879279873114 {
export type Builder = types_.Provide.Builder;
export type Reader = types_.Provide.Reader;
export type Pos = types_.Provide.Pos;
export type Neg = types_.Provide.Neg;
}
export module Accept{
type Pos = { questionId: string;
provision?: Buffer;
embargo: boolean;
 }
type Reader = Pos;
type Neg = { questionId?: string;
provision?: Buffer;
embargo?: boolean;
 }
type Builder = Neg;

}
export module $15332985841292492822 {
export type Builder = types_.Accept.Builder;
export type Reader = types_.Accept.Reader;
export type Pos = types_.Accept.Pos;
export type Neg = types_.Accept.Neg;
}
export module Join{
type Pos = { questionId: string;
target?: $10789521159760378817.Pos;
keyPart?: Buffer;
 }
type Reader = Pos;
type Neg = { questionId?: string;
target?: $10789521159760378817.Neg;
keyPart?: Buffer;
 }
type Builder = Neg;

}
export module $18149955118657700271 {
export type Builder = types_.Join.Builder;
export type Reader = types_.Join.Reader;
export type Pos = types_.Join.Pos;
export type Neg = types_.Join.Neg;
}
export module MessageTarget{
type Pos = {  } & ({ importedCap: string;
 } | {promisedAnswer?: $15564635848320162976.Pos;
} | {})
type Reader = Pos;
type Neg = {  } & ({ importedCap?: string;
 } | {promisedAnswer?: $15564635848320162976.Neg;
} | {})
type Builder = Neg;

}
export module $10789521159760378817 {
export type Builder = types_.MessageTarget.Builder;
export type Reader = types_.MessageTarget.Reader;
export type Pos = types_.MessageTarget.Pos;
export type Neg = types_.MessageTarget.Neg;
}
export module Payload{
type Pos = { content?: Buffer;
capTable?: $9593755465305995440.Pos[];
 }
type Reader = Pos;
type Neg = { content?: Buffer;
capTable?: $9593755465305995440.Neg[];
 }
type Builder = Neg;

}
export module $11100916931204903995 {
export type Builder = types_.Payload.Builder;
export type Reader = types_.Payload.Reader;
export type Pos = types_.Payload.Pos;
export type Neg = types_.Payload.Neg;
}
export module CapDescriptor{
type Pos = { attachedFd: number;
 } & ({ none: void;
 } | {senderHosted: string;
} | {senderPromise: string;
} | {receiverHosted: string;
} | {receiverAnswer?: $15564635848320162976.Pos;
} | {thirdPartyHosted?: $15235686326393111165.Pos;
} | {})
type Reader = Pos;
type Neg = { attachedFd?: number;
 } & ({ none?: void;
 } | {senderHosted?: string;
} | {senderPromise?: string;
} | {receiverHosted?: string;
} | {receiverAnswer?: $15564635848320162976.Neg;
} | {thirdPartyHosted?: $15235686326393111165.Neg;
} | {})
type Builder = Neg;

}
export module $9593755465305995440 {
export type Builder = types_.CapDescriptor.Builder;
export type Reader = types_.CapDescriptor.Reader;
export type Pos = types_.CapDescriptor.Pos;
export type Neg = types_.CapDescriptor.Neg;
}
export module PromisedAnswer{
type Pos = { questionId: string;
transform?: $17516350820840804481.Pos[];
 }
type Reader = Pos;
type Neg = { questionId?: string;
transform?: $17516350820840804481.Neg[];
 }
type Builder = Neg;
export module Op{
type Pos = {  } & ({ noop: void;
 } | {getPointerField: number;
} | {})
type Reader = Pos;
type Neg = {  } & ({ noop?: void;
 } | {getPointerField?: number;
} | {})
type Builder = Neg;

}

}
export module $15564635848320162976 {
export type Builder = types_.PromisedAnswer.Builder;
export type Reader = types_.PromisedAnswer.Reader;
export type Pos = types_.PromisedAnswer.Pos;
export type Neg = types_.PromisedAnswer.Neg;
}
export module $17516350820840804481 {
export type Builder = types_.PromisedAnswer.Op.Builder;
export type Reader = types_.PromisedAnswer.Op.Reader;
export type Pos = types_.PromisedAnswer.Op.Pos;
export type Neg = types_.PromisedAnswer.Op.Neg;
}
export module ThirdPartyCapDescriptor{
type Pos = { id?: Buffer;
vineId: string;
 }
type Reader = Pos;
type Neg = { id?: Buffer;
vineId?: string;
 }
type Builder = Neg;

}
export module $15235686326393111165 {
export type Builder = types_.ThirdPartyCapDescriptor.Builder;
export type Reader = types_.ThirdPartyCapDescriptor.Reader;
export type Pos = types_.ThirdPartyCapDescriptor.Pos;
export type Neg = types_.ThirdPartyCapDescriptor.Neg;
}
export module Exception{
type Pos = { reason: string;
obsoleteIsCallersFault: boolean;
obsoleteDurability: number;
type: $12865824133959433560.Pos;
 }
type Reader = Pos;
type Neg = { reason?: string;
obsoleteIsCallersFault?: boolean;
obsoleteDurability?: number;
type?: $12865824133959433560.Neg;
 }
type Builder = Neg;
export module Type{
type Pos =  | "failed" | "overloaded" | "disconnected" | "unimplemented" | number;
type Reader = Pos;
type Neg =  | "failed" | "overloaded" | "disconnected" | "unimplemented";
type Builder = Neg;

}

}
export module $15430940935639230746 {
export type Builder = types_.Exception.Builder;
export type Reader = types_.Exception.Reader;
export type Pos = types_.Exception.Pos;
export type Neg = types_.Exception.Neg;
}
export module $12865824133959433560 {
export type Builder = types_.Exception.Type.Builder;
export type Reader = types_.Exception.Type.Reader;
export type Pos = types_.Exception.Type.Pos;
export type Neg = types_.Exception.Type.Neg;
}
}
export const Message: $Capnp.StructSchema<types_.Message.Builder, types_.Message.Reader> & {
};
export const Bootstrap: $Capnp.StructSchema<types_.Bootstrap.Builder, types_.Bootstrap.Reader> & {
};
export const Call: $Capnp.StructSchema<types_.Call.Builder, types_.Call.Reader> & {
};
export const Return: $Capnp.StructSchema<types_.Return.Builder, types_.Return.Reader> & {
};
export const Finish: $Capnp.StructSchema<types_.Finish.Builder, types_.Finish.Reader> & {
};
export const Resolve: $Capnp.StructSchema<types_.Resolve.Builder, types_.Resolve.Reader> & {
};
export const Release: $Capnp.StructSchema<types_.Release.Builder, types_.Release.Reader> & {
};
export const Disembargo: $Capnp.StructSchema<types_.Disembargo.Builder, types_.Disembargo.Reader> & {
};
export const Provide: $Capnp.StructSchema<types_.Provide.Builder, types_.Provide.Reader> & {
};
export const Accept: $Capnp.StructSchema<types_.Accept.Builder, types_.Accept.Reader> & {
};
export const Join: $Capnp.StructSchema<types_.Join.Builder, types_.Join.Reader> & {
};
export const MessageTarget: $Capnp.StructSchema<types_.MessageTarget.Builder, types_.MessageTarget.Reader> & {
};
export const Payload: $Capnp.StructSchema<types_.Payload.Builder, types_.Payload.Reader> & {
};
export const CapDescriptor: $Capnp.StructSchema<types_.CapDescriptor.Builder, types_.CapDescriptor.Reader> & {
};
export const PromisedAnswer: $Capnp.StructSchema<types_.PromisedAnswer.Builder, types_.PromisedAnswer.Reader> & {
Op: $Capnp.StructSchema<types_.PromisedAnswer.Op.Builder, types_.PromisedAnswer.Op.Reader> & {
},
};
export const ThirdPartyCapDescriptor: $Capnp.StructSchema<types_.ThirdPartyCapDescriptor.Builder, types_.ThirdPartyCapDescriptor.Reader> & {
};
export const Exception: $Capnp.StructSchema<types_.Exception.Builder, types_.Exception.Reader> & {
};

}
export default $tmp;