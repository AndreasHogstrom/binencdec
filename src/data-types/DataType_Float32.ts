import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Float32 extends DataType_BaseNumber {
  size = 4

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getFloat32(offset)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setFloat32(0, value)
  }
}
