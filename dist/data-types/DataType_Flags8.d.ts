import DataType from "./DataType";
export default class DataType_Flags8 extends DataType<Record<string, boolean>> {
    fields: string[];
    constructor(fieldName: string);
    randomValue(): Record<string, boolean>;
    decode(dataView: DataView, offset: number): [Record<string, boolean>, number];
    encode(value: Record<string, boolean>): ArrayBuffer;
}
