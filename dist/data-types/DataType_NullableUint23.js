"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_NullableUint23 extends DataType_1.default {
    decode(dataView, offset) {
        if (dataView.getUint8(offset) & 0b1000_0000) {
            return [null, 3];
        }
        return [
            ((dataView.getUint8(offset) & 0b0111_1111) << 16) +
                ((dataView.getUint8(offset + 1)) << 8) +
                (dataView.getUint8(offset + 2)),
            3
        ];
    }
    encode(value) {
        if (value === null) {
            return new Uint8Array([0b1000_0000, 0, 0]).buffer;
        }
        return new Uint8Array([(value >> 16) & 0b0111_1111, (value >> 8) & 0b1111_1111, value & 0b1111_1111]).buffer;
    }
    randomValue() {
        const u8a = new Uint8Array(3);
        for (let i = 0; i < u8a.length; i++) {
            u8a[i] = Math.floor(Math.random() * 2 ** 8);
        }
        return this.decode(new DataView(u8a.buffer), 0)[0];
    }
}
exports.default = DataType_NullableUint23;
