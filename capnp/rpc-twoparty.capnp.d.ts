import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Side{
type Builder =  | "server" | "client";
type Reader =  | "server" | "client" | number;

}
export module $11517567629614739868 {
export type Builder = types_.Side.Builder;
export type Reader = types_.Side.Reader;
}
export module VatId{
type Builder = { side?: $11517567629614739868.Builder;
 }
type Reader = { side: $11517567629614739868.Reader;
 }

}
export module $15135349989283412622 {
export type Builder = types_.VatId.Builder;
export type Reader = types_.VatId.Reader;
}
export module ProvisionId{
type Builder = { joinId?: string;
 }
type Reader = { joinId: string;
 }

}
export module $13298295899470141463 {
export type Builder = types_.ProvisionId.Builder;
export type Reader = types_.ProvisionId.Reader;
}
export module RecipientId{
type Builder = {  }
type Reader = {  }

}
export module $9940440221562733249 {
export type Builder = types_.RecipientId.Builder;
export type Reader = types_.RecipientId.Reader;
}
export module ThirdPartyCapId{
type Builder = {  }
type Reader = {  }

}
export module $13006195034640135581 {
export type Builder = types_.ThirdPartyCapId.Builder;
export type Reader = types_.ThirdPartyCapId.Reader;
}
export module JoinKeyPart{
type Builder = { joinId?: string;
partCount?: number;
partNum?: number;
 }
type Reader = { joinId: string;
partCount: number;
partNum: number;
 }

}
export module $10786842769591618179 {
export type Builder = types_.JoinKeyPart.Builder;
export type Reader = types_.JoinKeyPart.Reader;
}
export module JoinResult{
type Builder = { joinId?: string;
succeeded?: boolean;
cap?: Buffer;
 }
type Reader = { joinId: string;
succeeded: boolean;
cap: Buffer;
 }

}
export module $11323802317489695726 {
export type Builder = types_.JoinResult.Builder;
export type Reader = types_.JoinResult.Reader;
}
}
export const VatId: $Capnp.StructSchema<types_.VatId.Reader, types_.VatId.Builder> & {
};
export const ProvisionId: $Capnp.StructSchema<types_.ProvisionId.Reader, types_.ProvisionId.Builder> & {
};
export const RecipientId: $Capnp.StructSchema<types_.RecipientId.Reader, types_.RecipientId.Builder> & {
};
export const ThirdPartyCapId: $Capnp.StructSchema<types_.ThirdPartyCapId.Reader, types_.ThirdPartyCapId.Builder> & {
};
export const JoinKeyPart: $Capnp.StructSchema<types_.JoinKeyPart.Reader, types_.JoinKeyPart.Builder> & {
};
export const JoinResult: $Capnp.StructSchema<types_.JoinResult.Reader, types_.JoinResult.Builder> & {
};

}
export default $tmp;