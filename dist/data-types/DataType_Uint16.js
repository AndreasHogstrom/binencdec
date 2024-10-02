"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataType_BaseNumber_1 = __importDefault(require("./DataType_BaseNumber"));
class DataType_Uint16 extends DataType_BaseNumber_1.default {
    constructor() {
        super(...arguments);
        this.size = 2;
    }
    dataViewGet(dataView, offset) {
        return dataView.getUint16(offset);
    }
    dataViewSet(dataView, value) {
        dataView.setUint16(0, value);
    }
}
exports.default = DataType_Uint16;
