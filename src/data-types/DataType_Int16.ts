import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Int16 extends DataType_BaseNumber {
  size = 2

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getInt16(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setInt16(0, value)
  }
}
