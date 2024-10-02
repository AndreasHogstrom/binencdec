"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_String32 extends DataType_1.default {
    constructor() {
        super(...arguments);
        this.size = 32;
    }
    randomValue() {
        const u8a = new Uint8Array(this.size);
        for (let i = 0; i < u8a.length; i++) {
            u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21);
        }
        const td = new TextDecoder();
        return td.decode(u8a);
    }
    decode(dataView, offset) {
        const decoder = new TextDecoder();
        return [decoder.decode(dataView.buffer.slice(offset, offset + this.size)).replaceAll("\u0000", ""), this.size];
    }
    encode(value) {
        const te = new TextEncoder();
        const encoded = te.encode(value);
        const ab = new ArrayBuffer(this.size);
        const dw = new DataView(ab);
        for (let i = 0; i < this.size; i++) {
            dw.setUint8(i, encoded[i]);
        }
        return ab;
    }
}
exports.default = DataType_String32;
