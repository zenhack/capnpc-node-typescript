import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Side{
type Pos =  | "server" | "client" | number;
type Reader = Pos;
type Neg =  | "server" | "client";
type Builder = Neg;

}
export module $11517567629614739868 {
export type Builder = types_.Side.Builder;
export type Reader = types_.Side.Reader;
export type Pos = types_.Side.Pos;
export type Neg = types_.Side.Neg;
}
export module VatId{
type Pos = { side: $11517567629614739868.Pos;
 }
type Reader = Pos;
type Neg = { side?: $11517567629614739868.Neg;
 }
type Builder = Neg;

}
export module $15135349989283412622 {
export type Builder = types_.VatId.Builder;
export type Reader = types_.VatId.Reader;
export type Pos = types_.VatId.Pos;
export type Neg = types_.VatId.Neg;
}
export module ProvisionId{
type Pos = { joinId: string;
 }
type Reader = Pos;
type Neg = { joinId?: string;
 }
type Builder = Neg;

}
export module $13298295899470141463 {
export type Builder = types_.ProvisionId.Builder;
export type Reader = types_.ProvisionId.Reader;
export type Pos = types_.ProvisionId.Pos;
export type Neg = types_.ProvisionId.Neg;
}
export module RecipientId{
type Pos = {  }
type Reader = Pos;
type Neg = {  }
type Builder = Neg;

}
export module $9940440221562733249 {
export type Builder = types_.RecipientId.Builder;
export type Reader = types_.RecipientId.Reader;
export type Pos = types_.RecipientId.Pos;
export type Neg = types_.RecipientId.Neg;
}
export module ThirdPartyCapId{
type Pos = {  }
type Reader = Pos;
type Neg = {  }
type Builder = Neg;

}
export module $13006195034640135581 {
export type Builder = types_.ThirdPartyCapId.Builder;
export type Reader = types_.ThirdPartyCapId.Reader;
export type Pos = types_.ThirdPartyCapId.Pos;
export type Neg = types_.ThirdPartyCapId.Neg;
}
export module JoinKeyPart{
type Pos = { joinId: string;
partCount: number;
partNum: number;
 }
type Reader = Pos;
type Neg = { joinId?: string;
partCount?: number;
partNum?: number;
 }
type Builder = Neg;

}
export module $10786842769591618179 {
export type Builder = types_.JoinKeyPart.Builder;
export type Reader = types_.JoinKeyPart.Reader;
export type Pos = types_.JoinKeyPart.Pos;
export type Neg = types_.JoinKeyPart.Neg;
}
export module JoinResult{
type Pos = { joinId: string;
succeeded: boolean;
cap?: Buffer;
 }
type Reader = Pos;
type Neg = { joinId?: string;
succeeded?: boolean;
cap?: Buffer;
 }
type Builder = Neg;

}
export module $11323802317489695726 {
export type Builder = types_.JoinResult.Builder;
export type Reader = types_.JoinResult.Reader;
export type Pos = types_.JoinResult.Pos;
export type Neg = types_.JoinResult.Neg;
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