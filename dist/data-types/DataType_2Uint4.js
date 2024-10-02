"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_2Uint4 extends DataType_1.default {
    decode(dataView, offset) {
        const value = dataView.getUint8(offset);
        return [
            [
                value & 0b0000_1111,
                (value & 0b1111_0000) >> 4,
            ],
            1
        ];
    }
    encode(value) {
        return new Uint8Array([
            value[0] | (value[1] << 4)
        ]).buffer;
    }
    randomValue() {
        return [
            Math.floor(Math.random() * 2 ** 4),
            Math.floor(Math.random() * 2 ** 4),
        ];
    }
}
exports.default = DataType_2Uint4;
