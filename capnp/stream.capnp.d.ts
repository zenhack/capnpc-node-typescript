import $Capnp from "capnp";
import $13688829037717245569 from "capnp/c++.capnp.js";
declare module $tmp {
export module types_ {
export module StreamResult{
type Builder = {  }
type Reader = {  }

}
export module $11051721556433613166 {
export type Builder = types_.StreamResult.Builder;
export type Reader = types_.StreamResult.Reader;
}
}
export const StreamResult: $Capnp.StructSchema<types_.StreamResult.Reader, types_.StreamResult.Builder> & {
};

}
export default $tmp;