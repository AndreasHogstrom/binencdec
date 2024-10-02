import decode from "../varint/decode"
import encode from "../varint/encode"
import DataType from "./DataType"

export default class DataType_Varstring32 extends DataType<string> {
  randomValue(): string {
    const u8a = new Uint8Array(Math.floor(Math.random() * 2**28))
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21)
    }
    const td = new TextDecoder()
    return td.decode(u8a)
  }

  decode(dataView: DataView, offset: number): [string, number] {
    const [length, lengthConsumedBytes] = decode(dataView.buffer.slice(offset, offset + 4))
    const decoder = new TextDecoder()

    return [decoder.decode(dataView.buffer.slice(offset + lengthConsumedBytes, offset + lengthConsumedBytes + length)), lengthConsumedBytes + length]
  }

  encode(value: string): ArrayBuffer {
    const te = new TextEncoder()
    const encoded = te.encode(value)
    const clampedLength = Math.min(2**28-1, encoded.byteLength)
    const lengthAb = new Uint8Array(encode(clampedLength))
    const ab = new ArrayBuffer(lengthAb.byteLength + clampedLength)
    const dw = new DataView(ab)

    for (let i = 0; i < lengthAb.byteLength; i++) {
      dw.setUint8(i, lengthAb[i])
    }

    for (let i = 0; i < clampedLength; i++) {
      dw.setUint8(lengthAb.byteLength + i, encoded[i])
    }
    return ab
  }
}