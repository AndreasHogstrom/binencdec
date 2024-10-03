import Decoder from "./Decoder";
import Encoder from "./Encoder";
export declare function makeDecoder<TObject extends Record<string, unknown>>(schema: string): Decoder<TObject>;
export declare function makeEncoder<TObject extends Record<string, unknown>>(schema: string): Encoder<TObject>;
export declare function parseSchema(schema: string): [string, string][];
