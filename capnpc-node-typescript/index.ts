import * as fs from 'fs';
import * as path from 'path';

import capnp from 'capnp';
import schema from 'capnp/schema.capnp.js';

import { cgrToFileContents } from './cgr.js';
import * as iolist from './iolist.js';

export function main() {
  const buffer: Buffer = fs.readFileSync('/dev/stdin');
  const cgr: schema.types_.CodeGeneratorRequest.Reader = capnp.parse(schema.CodeGeneratorRequest, buffer);
  const fileContents = cgrToFileContents(cgr);
  for(const filePath of Object.getOwnPropertyNames(fileContents)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    iolist.writeFile(filePath, fileContents[filePath]);
  }
}

