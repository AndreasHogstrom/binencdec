import DataType from "./DataType";
export default class DataType_Nullstring extends DataType<string> {
    randomValue(): string;
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
}
