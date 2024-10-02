"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_Uint16_Enum extends DataType_1.default {
    constructor(fieldName) {
        super(fieldName);
        this.size = 2;
        const [, name, values] = /^(.+?)\[(.+,?)+\]$/.exec(fieldName) ?? [];
        this.name = name;
        this.values = values.split(",");
    }
    decode(dataView, offset) {
        return [this.values[dataView.getUint16(offset)], this.size];
    }
    encode(value) {
        const ab = new ArrayBuffer(this.size);
        const dw = new DataView(ab);
        dw.setUint16(0, this.values.indexOf(value));
        return ab;
    }
    randomValue() {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }
}
exports.default = DataType_Uint16_Enum;
