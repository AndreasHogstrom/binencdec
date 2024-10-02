"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_1 = __importDefault(require("./DataType"));
class DataType_BaseNumber extends DataType_1.default {
    constructor() {
        super(...arguments);
        this.size = 0;
    }
    dataViewGet(dataView, offset) {
        return dataView.getUint8(offset);
    }
    decode(dataView, offset) {
        return [this.dataViewGet(dataView, offset), this.size];
    }
    dataViewSet(dataView, value) {
        dataView.setUint8(0, value);
    }
    encode(value) {
        const ab = new ArrayBuffer(this.size);
        const dw = new DataView(ab);
        this.dataViewSet(dw, value);
        return ab;
    }
    randomValue() {
        const u8a = new Uint8Array(this.size);
        for (let i = 0; i < u8a.length; i++) {
            u8a[i] = Math.floor(Math.random() * 2 ** 8);
        }
        return this.decode(new DataView(u8a.buffer), 0)[0];
    }
}
exports.default = DataType_BaseNumber;
