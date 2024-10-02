import DataType from "./DataType";

export default class DataType_2Uint4 extends DataType<[number, number]> {
  decode(dataView: DataView, offset: number): [[number, number], number] {
    const value = dataView.getUint8(offset)
    return [
      [
        value & 0b0000_1111,
        (value & 0b1111_0000) >> 4,
      ],
      1
    ]
  }
  encode(value: [number, number]): ArrayBuffer {
    return new Uint8Array([
      value[0] | (value[1] << 4) 
    ]).buffer
  }
  randomValue(): [number, number] {
    return [
      Math.floor(Math.random() * 2**4),
      Math.floor(Math.random() * 2**4),
    ]
  }
}