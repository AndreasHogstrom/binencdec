import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Uint16 extends DataType_BaseNumber {
  size = 2

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getUint16(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setUint16(0, value)
  }
}
