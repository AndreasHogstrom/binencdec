"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDecoder = makeDecoder;
exports.makeEncoder = makeEncoder;
exports.parseSchema = parseSchema;
const Decoder_1 = __importDefault(require("./Decoder"));
const Encoder_1 = __importDefault(require("./Encoder"));
function makeDecoder(schema) {
    return new Decoder_1.default(parseSchema(schema));
}
function makeEncoder(schema) {
    return new Encoder_1.default(parseSchema(schema));
}
function parseSchema(schema) {
    const [version, ...rest] = schema.trim().split(/\s+|\n/);
    switch (version) {
        case "1":
            return rest.reduce((acc, curr, index) => {
                if (index % 2 === 0) {
                    acc.push([curr]);
                }
                else {
                    acc.at(-1).push(curr);
                }
                return acc;
            }, []);
        default:
            throw new Error(`Unsupported schema version: ${version}`);
    }
}
