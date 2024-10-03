"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_BaseNumber_1 = __importDefault(require("./DataType_BaseNumber"));
class DataType_Uint48 extends DataType_BaseNumber_1.default {
    constructor() {
        super(...arguments);
        this.size = 6;
    }
    dataViewGet(dataView, offset) {
        return dataView.getUint32(offset) * 2 ** 16 + dataView.getUint16(offset + 4);
    }
    dataViewSet(dataView, value) {
        dataView.setUint32(0, Math.floor(value / 2 ** 16));
        dataView.setUint16(4, value & 0xFFFF);
    }
}
exports.default = DataType_Uint48;
