import DataType from "./DataType";
export default class DataType_2Uint4 extends DataType<[number, number]> {
    decode(dataView: DataView, offset: number): [[number, number], number];
    encode(value: [number, number]): ArrayBuffer;
    randomValue(): [number, number];
}
