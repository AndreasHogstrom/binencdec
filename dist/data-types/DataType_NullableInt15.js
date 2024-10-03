"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_NullableInt15 extends DataType_1.default {
    decode(dataView, offset) {
        if (dataView.getUint8(offset) & 0b1000_0000) {
            return [null, 2];
        }
        const value = ((dataView.getUint8(offset) & 0b0111_1111) << 8) + ((dataView.getUint8(offset + 1)));
        if (dataView.getUint8(offset) & 0b0100_0000) {
            return [-(~((value | 0b1000_0000_0000_0000) - 1) & 0xFFFF), 3];
        }
        return [value, 2];
    }
    encode(value) {
        if (value === null) {
            return new Uint8Array([0b1000_0000, 0]).buffer;
        }
        const dw = new DataView(new ArrayBuffer(2));
        dw.setInt16(0, value);
        dw.setUint8(0, dw.getUint8(0) & 0b0111_1111);
        return dw.buffer;
    }
    randomValue() {
        const u8a = new Uint8Array(2);
        for (let i = 0; i < u8a.length; i++) {
            u8a[i] = Math.floor(Math.random() * 2 ** 8);
        }
        return this.decode(new DataView(u8a.buffer), 0)[0];
    }
}
exports.default = DataType_NullableInt15;
