"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_Boolean extends DataType_1.default {
    randomValue() {
        throw new Error("Method not implemented.");
    }
    decode(dataView, offset) {
        return [dataView.getUint8(offset) !== 0, 1];
    }
    encode(value) {
        const ab = new ArrayBuffer(1);
        const dw = new DataView(ab);
        dw.setUint8(0, value ? 1 : 0);
        return ab;
    }
}
exports.default = DataType_Boolean;
