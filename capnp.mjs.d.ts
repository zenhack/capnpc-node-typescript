declare class Schema<T> {
  typeId: string;
}

declare function parse<T>(type: Schema<T>, buffer: Buffer): T;
