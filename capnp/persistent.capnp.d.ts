import $Capnp from "capnp";
import * as $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module Persistent{
type Client = {
}
type Server = {
}
export module SaveParams{
type Builder = { sealFor?: Buffer;
 }
type Reader = { sealFor: Buffer;
 }

}
export module SaveResults{
type Builder = { sturdyRef?: Buffer;
 }
type Reader = { sturdyRef: Buffer;
 }

}

}
export module $14468694717054801553 {
export type Client = types_.Persistent.Client;
export type Server = types_.Persistent.Server;
}
export module $17829674341603767205 {
export type Builder = types_.Persistent.SaveParams.Builder;
export type Reader = types_.Persistent.SaveParams.Reader;
}
export module $13215893102637674431 {
export type Builder = types_.Persistent.SaveResults.Builder;
export type Reader = types_.Persistent.SaveResults.Reader;
}
export module RealmGateway{
type Client = {
}
type Server = {
}

}
export module $9583422979879616212 {
export type Client = types_.RealmGateway.Client;
export type Server = types_.RealmGateway.Server;
}
export module persistent{

}
export module $17735836485116689255 {
}
}

}
export default $tmp;