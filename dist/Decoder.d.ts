import Coder from "./Coder";
export default class Decoder<TObject extends Record<string, unknown>> extends Coder<TObject> {
    parse(ab: ArrayBuffer, offset?: number): [TObject, number];
    multiParse(ab: ArrayBuffer): TObject[];
}
