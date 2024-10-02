import DataType from "./DataType";
export default class DataType_Varstring32 extends DataType<string> {
    randomValue(): string;
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
}
