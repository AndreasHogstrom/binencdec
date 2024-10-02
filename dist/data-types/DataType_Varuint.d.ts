import DataType from "./DataType";
export default class DataType_Varuint extends DataType<number> {
    decode(dataView: DataView, offset: number): [number, number];
    encode(value: number): ArrayBuffer;
    randomValue(): number;
}
