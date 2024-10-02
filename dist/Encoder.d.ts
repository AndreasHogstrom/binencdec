import Coder from "./Coder";
export default class Encoder extends Coder {
    make(obj: Record<string, unknown>): ArrayBuffer;
    multiMake(objs: Record<string, unknown>[]): ArrayBuffer;
    randomMake(): ArrayBuffer;
}
