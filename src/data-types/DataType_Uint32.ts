import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Uint32 extends DataType_BaseNumber {
  size = 4

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getUint32(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setUint32(0, value)
  }
}
