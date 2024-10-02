import DataType from "./DataType";
export default class DataType_Uint8_Enum extends DataType<string> {
    size: number;
    name: string;
    values: string[];
    constructor(fieldName: string);
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
    randomValue(): string;
}
