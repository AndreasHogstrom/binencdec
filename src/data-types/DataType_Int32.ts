import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Int32 extends DataType_BaseNumber {
  size = 4

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getInt32(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setInt32(0, value)
  }
}
