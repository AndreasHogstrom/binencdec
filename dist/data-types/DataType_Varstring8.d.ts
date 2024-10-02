import DataType from "./DataType";
export default class DataType_Varstring8 extends DataType<string> {
    randomValue(): string;
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
    encode2(value: string): ArrayBuffer;
}
