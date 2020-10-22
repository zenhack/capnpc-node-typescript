// Misc. utiltites that aren't logically related to capnp

export type StrDict<T> = { [k: string]: T }
// type alias for a dictionary with strings as keys.

export function impossible(_n: never): never {
  // This function is used to assert that we've covered all cases;
  // use like:
  //
  // if(...) {
  //   ...
  // } else if(...) {
  //   ...
  // } else {
  //   impossible(foo);
  // }
  //
  // This way, you'll get a type error if you've missed a case.
  //
  // If somehow the type checker misses something (possible, both
  // because typescript's type system is unsound and because a
  // separately defined type declaration file for something could
  // be incorrect), this will throw an error rather than returning.
  throw new Error("impossible!");
}

export function assertDefined<T>(arg: T | undefined): T {
  if(arg === undefined) {
    throw new Error('Undefined.');
  }
  return arg;
}

export function definedOr<T>(arg: T | undefined, def: T): T {
  if(arg === undefined) {
    return def
  } else {
    return arg
  }
}
