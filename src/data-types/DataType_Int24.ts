import DataType_BaseNumber from "./DataType_BaseNumber"

export default class DataType_Int24 extends DataType_BaseNumber {
  size = 3

  dataViewGet(dataView: DataView, offset: number) {
    const value = (dataView.getUint16(offset) << 8) + dataView.getUint8(offset + 2)
    if (value & 0x800000) {
      return -(~(value - 1) & 0xFFFFFF)
    }

    return value
  }

  dataViewSet(dataView: DataView, value: number) {
    if (value >= 0) {
      dataView.setUint16(0, value >> 8)
      dataView.setUint8(2, value & 0xFF)
    } else {
      const negativeValue = (~Math.abs(value) & 0xFFFFFF) + 1
      dataView.setUint16(0, negativeValue >> 8)
      dataView.setUint8(2, negativeValue & 0xFF)
    }
  }
}
