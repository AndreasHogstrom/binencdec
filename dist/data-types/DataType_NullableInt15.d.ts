import DataType from "./DataType";
export default class DataType_NullableInt15 extends DataType<number | null> {
    decode(dataView: DataView, offset: number): [number | null, number];
    encode(value: number | null): ArrayBuffer;
    randomValue(): number | null;
}
