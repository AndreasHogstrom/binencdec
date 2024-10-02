"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_Nullstring extends DataType_1.default {
    randomValue() {
        const u8a = new Uint8Array(Math.floor(Math.random() * 2 ** 8));
        for (let i = 0; i < u8a.length; i++) {
            u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21);
        }
        const td = new TextDecoder();
        return td.decode(u8a);
    }
    decode(dataView, offset) {
        let i = 0;
        while (dataView.getUint8(offset + i) !== 0) {
            i++;
        }
        const td = new TextDecoder();
        const value = td.decode(dataView.buffer.slice(offset, offset + i));
        return [value, i + 1];
    }
    encode(value) {
        const te = new TextEncoder();
        const encoded = te.encode(value.replaceAll("\u0000", "") + "\u0000");
        return encoded.buffer;
    }
}
exports.default = DataType_Nullstring;
