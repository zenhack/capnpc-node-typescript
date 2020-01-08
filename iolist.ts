import { promises as fs } from 'fs';

export type IoList = Array<IoList> | string;

export function forEachString(list: IoList, f: (s: string) => void): void {
  if(typeof(list) === 'string') {
    console.log(list);
    f(list);
  } else {
    for(const v of list) {
      forEachString(v, f);
    }
  }
}

export function forEachStringPromise(list: IoList, f: (s: string) => Promise<void>): Promise<void> {
  let result = Promise.resolve();
  forEachString(list, (s) => {
    result = result.then(() => f(s))
  })
  return result;
}

export function appendFile(file: fs.FileHandle, data: IoList): Promise<void> {
  return forEachStringPromise(data, file.appendFile)
}

export async function writeFile(path: string, data: IoList): Promise<void> {
  if(path === undefined) {
    throw new Error("undefined path!");
  }
  let file;
  try {
    file = await fs.open(path, 'w');
    return appendFile(file, data);
  } finally {
    if(file !== undefined) {
      await file.close();
    }
  }
}
