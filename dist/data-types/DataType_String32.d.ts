import DataType from "./DataType";
export default class DataType_String32 extends DataType<string> {
    size: number;
    randomValue(): string;
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
}
