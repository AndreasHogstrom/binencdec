"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coder_1 = __importDefault(require("./Coder"));
class Decoder extends Coder_1.default {
    parse(ab, offset = 0) {
        const obj = {};
        const dataView = new DataView(ab);
        for (const [fieldName, dataType] of this.fields) {
            const [value, consumed] = dataType.decode(dataView, offset);
            obj[fieldName] = value;
            offset += consumed;
        }
        return [obj, offset];
    }
    multiParse(ab) {
        const objs = [];
        let offset = 0;
        while (offset < ab.byteLength) {
            const [obj, nextOffset] = this.parse(ab, offset);
            objs.push(obj);
            offset = nextOffset;
        }
        return objs;
    }
}
exports.default = Decoder;
