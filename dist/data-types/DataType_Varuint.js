"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encode_1 = __importDefault(require("../varint/encode"));
const decode_1 = __importDefault(require("../varint/decode"));
const DataType_1 = __importDefault(require("./DataType"));
class DataType_Varuint extends DataType_1.default {
    decode(dataView, offset) {
        return (0, decode_1.default)(dataView.buffer.slice(offset));
    }
    encode(value) {
        return (0, encode_1.default)(value);
    }
    randomValue() {
        throw new Error("Method not implemented.");
    }
}
exports.default = DataType_Varuint;
