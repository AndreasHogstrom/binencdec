import Coder from "./Coder";
export default class Decoder extends Coder {
    parse(ab: ArrayBuffer, offset?: number): [Record<string, unknown>, number];
    multiParse(ab: ArrayBuffer): Record<string, unknown>[];
}
