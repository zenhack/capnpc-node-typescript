import * as fs from 'fs';

export type IoList = Array<IoList> | string;

type Fd = number

function forEachString(list: IoList, f: (s: string) => void): void {
  if(typeof(list) === 'string') {
    f(list);
  } else {
    for(const v of list) {
      forEachString(v, f);
    }
  }
}

function writeFd(fd: Fd, data: IoList): void {
  return forEachString(data, (s) => fs.writeSync(fd, s))
}

export function writeFile(path: string, data: IoList): void {
  if(path === undefined) {
    throw new Error("undefined path!");
  }
  let fd;
  try {
    fd = fs.openSync(path, 'w');
    return writeFd(fd, data);
  } finally {
    if(fd !== undefined) {
      fs.closeSync(fd);
    }
  }
}

export function join(sep: IoList, parts: IoList[]): IoList {
  if(parts.length === 0) {
    return [];
  }
  const result = [parts[0]];
  for(let i = 1; i < parts.length; i++) {
    result.push(sep);
    result.push(parts[i]);
  }
  return result;
}
