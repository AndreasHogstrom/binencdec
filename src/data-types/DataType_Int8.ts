import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Int8 extends DataType_BaseNumber {
  size = 1

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getInt8(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setInt8(0, value)
  }
}
