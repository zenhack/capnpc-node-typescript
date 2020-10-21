import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module StreamResult{
type Pos = {  }
type Reader = Pos;
type Neg = {  }
type Builder = Neg;

}
export module $11051721556433613166 {
export type Builder = types_.StreamResult.Builder;
export type Reader = types_.StreamResult.Reader;
export type Pos = types_.StreamResult.Pos;
export type Neg = types_.StreamResult.Neg;
}
}
export const StreamResult: $Capnp.StructSchema<types_.StreamResult.Reader, types_.StreamResult.Builder> & {
};

}
export default $tmp;