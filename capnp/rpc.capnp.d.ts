import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Message{
type Builder = {  } & ({ unimplemented?: $10500036013887172658.Builder;
 } | {abort?: $15430940935639230746.Builder;
} | {call?: $9469473312751832276.Builder;
} | {return?: $11392333052105676602.Builder;
} | {finish?: $15239388059401719395.Builder;
} | {resolve?: $13529541526594062446.Builder;
} | {release?: $12473400923157197975.Builder;
} | {obsoleteSave?: Buffer;
} | {bootstrap?: $16811039658553601732.Builder;
} | {obsoleteDelete?: Buffer;
} | {provide?: $11270825879279873114.Builder;
} | {accept?: $15332985841292492822.Builder;
} | {join?: $18149955118657700271.Builder;
} | {disembargo?: $17970548384007534353.Builder;
} | {})
type Reader = {  } & ({ unimplemented: $10500036013887172658.Reader;
 } | {abort: $15430940935639230746.Reader;
} | {call: $9469473312751832276.Reader;
} | {return: $11392333052105676602.Reader;
} | {finish: $15239388059401719395.Reader;
} | {resolve: $13529541526594062446.Reader;
} | {release: $12473400923157197975.Reader;
} | {obsoleteSave: Buffer;
} | {bootstrap: $16811039658553601732.Reader;
} | {obsoleteDelete: Buffer;
} | {provide: $11270825879279873114.Reader;
} | {accept: $15332985841292492822.Reader;
} | {join: $18149955118657700271.Reader;
} | {disembargo: $17970548384007534353.Reader;
} | {})

}
export module $10500036013887172658 {
export type Builder = types_.Message.Builder;
export type Reader = types_.Message.Reader;
}
export module Bootstrap{
type Builder = { questionId?: string;
deprecatedObjectId?: Buffer;
 }
type Reader = { questionId: string;
deprecatedObjectId: Buffer;
 }

}
export module $16811039658553601732 {
export type Builder = types_.Bootstrap.Builder;
export type Reader = types_.Bootstrap.Reader;
}
export module Call{
type Builder = { questionId?: string;
target?: $10789521159760378817.Builder;
interfaceId?: string;
methodId?: number;
params?: $11100916931204903995.Builder;
sendResultsTo?: {  } & ({ caller?: void;
 } | {yourself?: void;
} | {thirdParty?: Buffer;
} | {});
allowThirdPartyTailCall?: boolean;
 }
type Reader = { questionId: string;
target: $10789521159760378817.Reader;
interfaceId: string;
methodId: number;
params: $11100916931204903995.Reader;
sendResultsTo: {  } & ({ caller: void;
 } | {yourself: void;
} | {thirdParty: Buffer;
} | {});
allowThirdPartyTailCall: boolean;
 }

}
export module $9469473312751832276 {
export type Builder = types_.Call.Builder;
export type Reader = types_.Call.Reader;
}
export module Return{
type Builder = { answerId?: string;
releaseParamCaps?: boolean;
 } & ({ results?: $11100916931204903995.Builder;
 } | {exception?: $15430940935639230746.Builder;
} | {canceled?: void;
} | {resultsSentElsewhere?: void;
} | {takeFromOtherQuestion?: string;
} | {acceptFromThirdParty?: Buffer;
} | {})
type Reader = { answerId: string;
releaseParamCaps: boolean;
 } & ({ results: $11100916931204903995.Reader;
 } | {exception: $15430940935639230746.Reader;
} | {canceled: void;
} | {resultsSentElsewhere: void;
} | {takeFromOtherQuestion: string;
} | {acceptFromThirdParty: Buffer;
} | {})

}
export module $11392333052105676602 {
export type Builder = types_.Return.Builder;
export type Reader = types_.Return.Reader;
}
export module Finish{
type Builder = { questionId?: string;
releaseResultCaps?: boolean;
 }
type Reader = { questionId: string;
releaseResultCaps: boolean;
 }

}
export module $15239388059401719395 {
export type Builder = types_.Finish.Builder;
export type Reader = types_.Finish.Reader;
}
export module Resolve{
type Builder = { promiseId?: string;
 } & ({ cap?: $9593755465305995440.Builder;
 } | {exception?: $15430940935639230746.Builder;
} | {})
type Reader = { promiseId: string;
 } & ({ cap: $9593755465305995440.Reader;
 } | {exception: $15430940935639230746.Reader;
} | {})

}
export module $13529541526594062446 {
export type Builder = types_.Resolve.Builder;
export type Reader = types_.Resolve.Reader;
}
export module Release{
type Builder = { id?: string;
referenceCount?: string;
 }
type Reader = { id: string;
referenceCount: string;
 }

}
export module $12473400923157197975 {
export type Builder = types_.Release.Builder;
export type Reader = types_.Release.Reader;
}
export module Disembargo{
type Builder = { target?: $10789521159760378817.Builder;
context?: {  } & ({ senderLoopback?: string;
 } | {receiverLoopback?: string;
} | {accept?: void;
} | {provide?: string;
} | {});
 }
type Reader = { target: $10789521159760378817.Reader;
context: {  } & ({ senderLoopback: string;
 } | {receiverLoopback: string;
} | {accept: void;
} | {provide: string;
} | {});
 }

}
export module $17970548384007534353 {
export type Builder = types_.Disembargo.Builder;
export type Reader = types_.Disembargo.Reader;
}
export module Provide{
type Builder = { questionId?: string;
target?: $10789521159760378817.Builder;
recipient?: Buffer;
 }
type Reader = { questionId: string;
target: $10789521159760378817.Reader;
recipient: Buffer;
 }

}
export module $11270825879279873114 {
export type Builder = types_.Provide.Builder;
export type Reader = types_.Provide.Reader;
}
export module Accept{
type Builder = { questionId?: string;
provision?: Buffer;
embargo?: boolean;
 }
type Reader = { questionId: string;
provision: Buffer;
embargo: boolean;
 }

}
export module $15332985841292492822 {
export type Builder = types_.Accept.Builder;
export type Reader = types_.Accept.Reader;
}
export module Join{
type Builder = { questionId?: string;
target?: $10789521159760378817.Builder;
keyPart?: Buffer;
 }
type Reader = { questionId: string;
target: $10789521159760378817.Reader;
keyPart: Buffer;
 }

}
export module $18149955118657700271 {
export type Builder = types_.Join.Builder;
export type Reader = types_.Join.Reader;
}
export module MessageTarget{
type Builder = {  } & ({ importedCap?: string;
 } | {promisedAnswer?: $15564635848320162976.Builder;
} | {})
type Reader = {  } & ({ importedCap: string;
 } | {promisedAnswer: $15564635848320162976.Reader;
} | {})

}
export module $10789521159760378817 {
export type Builder = types_.MessageTarget.Builder;
export type Reader = types_.MessageTarget.Reader;
}
export module Payload{
type Builder = { content?: Buffer;
capTable?: $9593755465305995440.Builder[];
 }
type Reader = { content: Buffer;
capTable: $9593755465305995440.Reader[];
 }

}
export module $11100916931204903995 {
export type Builder = types_.Payload.Builder;
export type Reader = types_.Payload.Reader;
}
export module CapDescriptor{
type Builder = { attachedFd?: number;
 } & ({ none?: void;
 } | {senderHosted?: string;
} | {senderPromise?: string;
} | {receiverHosted?: string;
} | {receiverAnswer?: $15564635848320162976.Builder;
} | {thirdPartyHosted?: $15235686326393111165.Builder;
} | {})
type Reader = { attachedFd: number;
 } & ({ none: void;
 } | {senderHosted: string;
} | {senderPromise: string;
} | {receiverHosted: string;
} | {receiverAnswer: $15564635848320162976.Reader;
} | {thirdPartyHosted: $15235686326393111165.Reader;
} | {})

}
export module $9593755465305995440 {
export type Builder = types_.CapDescriptor.Builder;
export type Reader = types_.CapDescriptor.Reader;
}
export module PromisedAnswer{
type Builder = { questionId?: string;
transform?: $17516350820840804481.Builder[];
 }
type Reader = { questionId: string;
transform: $17516350820840804481.Reader[];
 }
export module Op{
type Builder = {  } & ({ noop?: void;
 } | {getPointerField?: number;
} | {})
type Reader = {  } & ({ noop: void;
 } | {getPointerField: number;
} | {})

}

}
export module $15564635848320162976 {
export type Builder = types_.PromisedAnswer.Builder;
export type Reader = types_.PromisedAnswer.Reader;
}
export module $17516350820840804481 {
export type Builder = types_.PromisedAnswer.Op.Builder;
export type Reader = types_.PromisedAnswer.Op.Reader;
}
export module ThirdPartyCapDescriptor{
type Builder = { id?: Buffer;
vineId?: string;
 }
type Reader = { id: Buffer;
vineId: string;
 }

}
export module $15235686326393111165 {
export type Builder = types_.ThirdPartyCapDescriptor.Builder;
export type Reader = types_.ThirdPartyCapDescriptor.Reader;
}
export module Exception{
type Builder = { reason?: string;
obsoleteIsCallersFault?: boolean;
obsoleteDurability?: number;
type?: $12865824133959433560.Builder;
 }
type Reader = { reason: string;
obsoleteIsCallersFault: boolean;
obsoleteDurability: number;
type: $12865824133959433560.Reader;
 }
export module Type{
type Builder =  | "failed" | "overloaded" | "disconnected" | "unimplemented";
type Reader =  | "failed" | "overloaded" | "disconnected" | "unimplemented" | number;

}

}
export module $15430940935639230746 {
export type Builder = types_.Exception.Builder;
export type Reader = types_.Exception.Reader;
}
export module $12865824133959433560 {
export type Builder = types_.Exception.Type.Builder;
export type Reader = types_.Exception.Type.Reader;
}
}
export const Message: $Capnp.StructSchema<types_.Message.Reader, types_.Message.Builder> & {
};
export const Bootstrap: $Capnp.StructSchema<types_.Bootstrap.Reader, types_.Bootstrap.Builder> & {
};
export const Call: $Capnp.StructSchema<types_.Call.Reader, types_.Call.Builder> & {
};
export const Return: $Capnp.StructSchema<types_.Return.Reader, types_.Return.Builder> & {
};
export const Finish: $Capnp.StructSchema<types_.Finish.Reader, types_.Finish.Builder> & {
};
export const Resolve: $Capnp.StructSchema<types_.Resolve.Reader, types_.Resolve.Builder> & {
};
export const Release: $Capnp.StructSchema<types_.Release.Reader, types_.Release.Builder> & {
};
export const Disembargo: $Capnp.StructSchema<types_.Disembargo.Reader, types_.Disembargo.Builder> & {
};
export const Provide: $Capnp.StructSchema<types_.Provide.Reader, types_.Provide.Builder> & {
};
export const Accept: $Capnp.StructSchema<types_.Accept.Reader, types_.Accept.Builder> & {
};
export const Join: $Capnp.StructSchema<types_.Join.Reader, types_.Join.Builder> & {
};
export const MessageTarget: $Capnp.StructSchema<types_.MessageTarget.Reader, types_.MessageTarget.Builder> & {
};
export const Payload: $Capnp.StructSchema<types_.Payload.Reader, types_.Payload.Builder> & {
};
export const CapDescriptor: $Capnp.StructSchema<types_.CapDescriptor.Reader, types_.CapDescriptor.Builder> & {
};
export const PromisedAnswer: $Capnp.StructSchema<types_.PromisedAnswer.Reader, types_.PromisedAnswer.Builder> & {
Op: $Capnp.StructSchema<types_.PromisedAnswer.Op.Reader, types_.PromisedAnswer.Op.Builder> & {
},
};
export const ThirdPartyCapDescriptor: $Capnp.StructSchema<types_.ThirdPartyCapDescriptor.Reader, types_.ThirdPartyCapDescriptor.Builder> & {
};
export const Exception: $Capnp.StructSchema<types_.Exception.Reader, types_.Exception.Builder> & {
};

}
export default $tmp;