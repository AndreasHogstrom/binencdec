"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decode;
function decode(value) {
    const u8a = new Uint8Array(value);
    let consumedBytes = 1;
    let res = 0;
    for (let i = 0; i < 4; i++) {
        res <<= 7;
        res += (u8a[i] & 0b0111_1111);
        if ((u8a[i] & 0b1000_0000) === 0) {
            break;
        }
        consumedBytes++;
    }
    return [res, consumedBytes];
}
