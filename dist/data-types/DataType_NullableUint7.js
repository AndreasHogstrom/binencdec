"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_NullableUint7 extends DataType_1.default {
    decode(dataView, offset) {
        if (dataView.getUint8(offset) & 0b1000_0000) {
            return [null, 1];
        }
        return [dataView.getUint8(offset) & 0b0111_1111, 1];
    }
    encode(value) {
        if (value === null) {
            return new Uint8Array([0b1000_0000]).buffer;
        }
        return new Uint8Array([value & 0b0111_1111]).buffer;
    }
    randomValue() {
        throw new Error("Method not implemented.");
    }
}
exports.default = DataType_NullableUint7;
