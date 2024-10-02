"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_Flags8 extends DataType_1.default {
    constructor(fieldName) {
        super(fieldName);
        const [, name, fields] = /^(.+?)\[(.+,?)+\]$/.exec(fieldName) ?? [];
        this.name = name;
        this.fields = fields.split(",");
    }
    randomValue() {
        return this.fields.reduce((acc, curr) => ({ ...acc, [curr]: Math.random() > 0.5 }), {});
    }
    decode(dataView, offset) {
        const value = dataView.getUint8(offset);
        return [this.fields.reduce((acc, curr, idx) => ({
                ...acc,
                [curr]: (value & 2 ** idx) === 2 ** idx
            }), {}), 1];
    }
    encode(value) {
        const u8a = new Uint8Array(1);
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (value[field]) {
                u8a[0] |= 2 ** i;
            }
        }
        return u8a.buffer;
    }
}
exports.default = DataType_Flags8;
