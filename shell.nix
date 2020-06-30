{ pkgs ? import <nixpkgs> {} }:
pkgs.stdenv.mkDerivation {
  name = "capnpc-node-typescript";
  buildInputs = [
    pkgs.capnproto
    pkgs.nodejs-12_x
  ];
}
