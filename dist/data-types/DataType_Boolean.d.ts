import DataType from "./DataType";
export default class DataType_Boolean extends DataType<boolean> {
    randomValue(): boolean;
    decode(dataView: DataView, offset: number): [boolean, number];
    encode(value: boolean): ArrayBuffer;
}
