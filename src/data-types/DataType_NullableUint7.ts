import DataType from "./DataType"

export default class DataType_NullableUint7 extends DataType<number | null> {
  decode(dataView: DataView, offset: number): [number | null, number] {
    if (dataView.getUint8(offset) & 0b1000_0000) {
      return [null, 1]
    }

    return [dataView.getUint8(offset) & 0b0111_1111, 1]
  }

  encode(value: number | null): ArrayBuffer {
    if (value === null) {
      return new Uint8Array([0b1000_0000]).buffer
    }

    return new Uint8Array([value & 0b0111_1111]).buffer
  }

  randomValue(): number | null {
    throw new Error("Method not implemented.")
  }
}
