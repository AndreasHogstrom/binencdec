import Coder from "./Coder";
export default class Encoder<TObject extends Record<string, unknown>> extends Coder<TObject> {
    make(obj: TObject): ArrayBuffer;
    multiMake(objs: TObject[]): ArrayBuffer;
    randomMake(): ArrayBuffer;
}
