import DataType_BaseNumber from "./DataType_BaseNumber";
export default class DataType_Int24 extends DataType_BaseNumber {
    size: number;
    dataViewGet(dataView: DataView, offset: number): number;
    dataViewSet(dataView: DataView, value: number): void;
}
