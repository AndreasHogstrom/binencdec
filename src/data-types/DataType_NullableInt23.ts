import DataType from "./DataType"

export default class DataType_NullableInt23 extends DataType<number | null> {
  decode(dataView: DataView, offset: number): [number | null, number] {
    if (dataView.getUint8(offset) & 0b1000_0000) {
      return [null, 3]
    }

    const value = ((dataView.getUint8(offset) & 0b0111_1111) << 16) + (dataView.getUint8(offset + 1) << 8) + ((dataView.getUint8(offset + 2)))

    if (dataView.getUint8(offset) & 0b0100_0000) {
      return [-(~((value | 0b1000_0000_0000_0000_0000_0000) - 1) & 0xFFFFFF), 3]
    }

    return [value, 3]
  }

  encode(value: number | null): ArrayBuffer {
    if (value === null) {
      return new Uint8Array([0b1000_0000, 0, 0]).buffer
    }

    if (value >= 0) {
      return new Uint8Array([(value >> 16) & 0b0111_1111, (value >> 8) & 0b1111_1111, value & 0b1111_1111]).buffer
    }

    const negativeValue = ((~Math.abs(value) & 0b0111_1111_1111_1111_1111_1111) + 1) & 0b0111_1111_1111_1111_1111_1111
    // console.log(negativeValue.toString(2).padStart(24, "0"))
    // console.log((negativeValue & 0xff00).toString(2).padStart(24, "0"))

    return new Uint8Array([(negativeValue & 0xFF0000) >> 16, (negativeValue & 0xFF00) >> 8, negativeValue & 0xFF]).buffer


    // const dw = new DataView(new ArrayBuffer(3))

    // dw.setInt16(0, value)
    // dw.setUint8(0, dw.getUint8(0) & 0b0111_1111)

    // return dw.buffer
  }

  randomValue(): number | null {
    const u8a = new Uint8Array(3)
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * 2**8)
    }
    return this.decode(new DataView(u8a.buffer), 0)[0]
  }
}
