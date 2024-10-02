import DataType from "./DataType";
export default class DataType_BaseNumber extends DataType<number> {
    size: number;
    dataViewGet(dataView: DataView, offset: number): number;
    decode(dataView: DataView, offset: number): [number, number];
    dataViewSet(dataView: DataView, value: number): void;
    encode(value: number): ArrayBuffer;
    randomValue(): number;
}
