import DataType from "./DataType";
export default class DataType_NullableUint23 extends DataType<number | null> {
    decode(dataView: DataView, offset: number): [number | null, number];
    encode(value: number | null): ArrayBuffer;
    randomValue(): number | null;
}
