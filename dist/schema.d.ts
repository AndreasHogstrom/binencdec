import Decoder from "./Decoder";
import Encoder from "./Encoder";
export declare function makeDecoder(schema: string): Decoder;
export declare function makeEncoder(schema: string): Encoder;
export declare function parseSchema(schema: string): [string, string][];
