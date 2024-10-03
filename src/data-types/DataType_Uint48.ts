import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Uint48 extends DataType_BaseNumber {
  size = 6

  dataViewGet(dataView: DataView, offset: number) {
    return dataView.getUint32(offset) * 2**16 + dataView.getUint16(offset + 4)
  }

  dataViewSet(dataView: DataView, value: number) {
    dataView.setUint32(0, Math.floor(value / 2**16))
    dataView.setUint16(4, value & 0xFFFF)
  }
}
