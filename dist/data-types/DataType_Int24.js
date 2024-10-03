"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_BaseNumber_1 = __importDefault(require("./DataType_BaseNumber"));
class DataType_Int24 extends DataType_BaseNumber_1.default {
    constructor() {
        super(...arguments);
        this.size = 3;
    }
    dataViewGet(dataView, offset) {
        const value = (dataView.getUint16(offset) << 8) + dataView.getUint8(offset + 2);
        if (value & 0x800000) {
            return -(~(value - 1) & 0xFFFFFF);
        }
        return value;
    }
    dataViewSet(dataView, value) {
        if (value >= 0) {
            dataView.setUint16(0, value >> 8);
            dataView.setUint8(2, value & 0xFF);
        }
        else {
            const negativeValue = (~Math.abs(value) & 0xFFFFFF) + 1;
            dataView.setUint16(0, negativeValue >> 8);
            dataView.setUint8(2, negativeValue & 0xFF);
        }
    }
}
exports.default = DataType_Int24;
