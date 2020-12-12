import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Persistent{
type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = $Capnp.AnyClient & {
save:(param: $17829674341603767205.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>) => Promise<$13215893102637674431.Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>>,
}
type Client<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = $Capnp.AnyServer & {
save?:(param: $17829674341603767205.Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>) => Promise<$13215893102637674431.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>> | $13215893102637674431.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>,
}
type Server<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
export module SaveParams{
type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = { sealFor?: Owner_Pos;
 }
type Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = { sealFor?: Owner_Neg;
 }
type Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;

}
export module SaveResults{
type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = { sturdyRef?: SturdyRef_Pos;
 }
type Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = { sturdyRef?: SturdyRef_Neg;
 }
type Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;

}

}
export module $14468694717054801553 {
export type Client<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.Client<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Server<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.Server<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
export type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
}
export module $17829674341603767205 {
export type Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.SaveParams.Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
export type Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.SaveParams.Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.SaveParams.Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.SaveParams.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
}
export module $13215893102637674431 {
export type Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.SaveResults.Builder<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
export type Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.SaveResults.Reader<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg> = types_.Persistent.SaveResults.Pos<SturdyRef_Pos,SturdyRef_Neg, Owner_Pos,Owner_Neg>;
export type Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos> = types_.Persistent.SaveResults.Neg<SturdyRef_Neg,SturdyRef_Pos, Owner_Neg,Owner_Pos>;
}
export module RealmGateway{
type Pos<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg> = $Capnp.AnyClient & {
import:(cap: $14468694717054801553.Neg<ExternalRef_Neg,ExternalRef_Pos, ExternalOwner_Neg,ExternalOwner_Pos>, params: $17829674341603767205.Neg<InternalRef_Neg,InternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos>) => Promise<$13215893102637674431.Pos<InternalRef_Pos,InternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg>>,
export:(cap: $14468694717054801553.Neg<InternalRef_Neg,InternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos>, params: $17829674341603767205.Neg<ExternalRef_Neg,ExternalRef_Pos, ExternalOwner_Neg,ExternalOwner_Pos>) => Promise<$13215893102637674431.Pos<ExternalRef_Pos,ExternalRef_Neg, ExternalOwner_Pos,ExternalOwner_Neg>>,
}
type Client<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg> = Pos<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg>;
type Neg<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos> = $Capnp.AnyServer & {
import?:(cap: $14468694717054801553.Pos<ExternalRef_Pos,ExternalRef_Neg, ExternalOwner_Pos,ExternalOwner_Neg>, params: $17829674341603767205.Pos<InternalRef_Pos,InternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg>) => Promise<$13215893102637674431.Neg<InternalRef_Neg,InternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos>> | $13215893102637674431.Neg<InternalRef_Neg,InternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos>,
export?:(cap: $14468694717054801553.Pos<InternalRef_Pos,InternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg>, params: $17829674341603767205.Pos<ExternalRef_Pos,ExternalRef_Neg, ExternalOwner_Pos,ExternalOwner_Neg>) => Promise<$13215893102637674431.Neg<ExternalRef_Neg,ExternalRef_Pos, ExternalOwner_Neg,ExternalOwner_Pos>> | $13215893102637674431.Neg<ExternalRef_Neg,ExternalRef_Pos, ExternalOwner_Neg,ExternalOwner_Pos>,
}
type Server<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos> = Neg<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos>;

}
export module $9583422979879616212 {
export type Client<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg> = types_.RealmGateway.Client<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg>;
export type Server<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos> = types_.RealmGateway.Server<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos>;
export type Pos<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg> = types_.RealmGateway.Pos<InternalRef_Pos,InternalRef_Neg, ExternalRef_Pos,ExternalRef_Neg, InternalOwner_Pos,InternalOwner_Neg, ExternalOwner_Pos,ExternalOwner_Neg>;
export type Neg<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos> = types_.RealmGateway.Neg<InternalRef_Neg,InternalRef_Pos, ExternalRef_Neg,ExternalRef_Pos, InternalOwner_Neg,InternalOwner_Pos, ExternalOwner_Neg,ExternalOwner_Pos>;
}
export module persistent{

}
export module $17735836485116689255 {
}
}
export const Persistent: $Capnp.InterfaceSchema<types_.Persistent.Server<Buffer,Buffer, Buffer,Buffer>, types_.Persistent.Client<Buffer,Buffer, Buffer,Buffer>> & {
SaveParams: $Capnp.StructSchema<types_.Persistent.SaveParams.Builder<Buffer,Buffer, Buffer,Buffer>, types_.Persistent.SaveParams.Reader<Buffer,Buffer, Buffer,Buffer>> & {
},
SaveResults: $Capnp.StructSchema<types_.Persistent.SaveResults.Builder<Buffer,Buffer, Buffer,Buffer>, types_.Persistent.SaveResults.Reader<Buffer,Buffer, Buffer,Buffer>> & {
},
};
export const RealmGateway: $Capnp.InterfaceSchema<types_.RealmGateway.Server<Buffer,Buffer, Buffer,Buffer, Buffer,Buffer, Buffer,Buffer>, types_.RealmGateway.Client<Buffer,Buffer, Buffer,Buffer, Buffer,Buffer, Buffer,Buffer>> & {
};

}
export default $tmp;