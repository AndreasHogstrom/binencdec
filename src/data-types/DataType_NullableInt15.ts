import DataType from "./DataType"

export default class DataType_NullableInt15 extends DataType<number | null> {
  decode(dataView: DataView, offset: number): [number | null, number] {
    if (dataView.getUint8(offset) & 0b1000_0000) {
      return [null, 2]
    }

    const value = ((dataView.getUint8(offset) & 0b0111_1111) << 8) + ((dataView.getUint8(offset + 1)))

    if (dataView.getUint8(offset) & 0b0100_0000) {
      return [-(~((value | 0b1000_0000_0000_0000) - 1) & 0xFFFF), 3]
    }

    return [value, 2]
  }

  encode(value: number | null): ArrayBuffer {
    if (value === null) {
      return new Uint8Array([0b1000_0000, 0]).buffer
    }

    const dw = new DataView(new ArrayBuffer(2))

    dw.setInt16(0, value)
    dw.setUint8(0, dw.getUint8(0) & 0b0111_1111)

    return dw.buffer
  }

  randomValue(): number | null {
    const u8a = new Uint8Array(2)
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * 2**8)
    }
    return this.decode(new DataView(u8a.buffer), 0)[0]
  }
}
