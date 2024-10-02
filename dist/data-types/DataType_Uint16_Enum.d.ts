import DataType from "./DataType";
export default class DataType_Uint16_Enum extends DataType<string> {
    size: number;
    name: string;
    values: string[];
    constructor(fieldName: string);
    decode(dataView: DataView, offset: number): [string, number];
    encode(value: string): ArrayBuffer;
    randomValue(): string;
}
