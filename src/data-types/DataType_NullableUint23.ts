import DataType from "./DataType"

export default class DataType_NullableUint23 extends DataType<number | null> {
  decode(dataView: DataView, offset: number): [number | null, number] {
    if (dataView.getUint8(offset) & 0b1000_0000) {
      return [null, 3]
    }

    return [
      ((dataView.getUint8(offset) & 0b0111_1111) << 16) + 
      ((dataView.getUint8(offset + 1)) << 8) + 
      (dataView.getUint8(offset + 2))
      , 3]
  }

  encode(value: number | null): ArrayBuffer {
    if (value === null) {
      return new Uint8Array([0b1000_0000, 0, 0]).buffer
    }

    return new Uint8Array([(value >> 16) & 0b0111_1111, (value >> 8) & 0b1111_1111, value & 0b1111_1111]).buffer
  }

  randomValue(): number | null {
    const u8a = new Uint8Array(3)
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * 2**8)
    }
    return this.decode(new DataView(u8a.buffer), 0)[0]
  }
}
