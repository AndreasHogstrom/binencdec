import DataType from "./DataType"

export default class DataType_Varstring8 extends DataType<string> {
  randomValue(): string {
    const u8a = new Uint8Array(Math.floor(Math.random() * 2**8))
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21)
    }
    const td = new TextDecoder()
    return td.decode(u8a)
  }
  decode(dataView: DataView, offset: number): [string, number] {
    const length = dataView.getUint8(offset)
    const decoder = new TextDecoder()

    return [decoder.decode(dataView.buffer.slice(offset + 1, offset + 1 + length)), 1 + length]
  }

  encode(value: string): ArrayBuffer {
    const te = new TextEncoder()
    const encoded = te.encode(value)
    const clampedLength = Math.min(2**8-1, encoded.byteLength)
    const ab = new ArrayBuffer(1 + clampedLength)
    const dw = new DataView(ab)
    dw.setUint8(0, clampedLength)
    for (let i = 0; i < clampedLength; i++) {
      dw.setUint8(1 + i, encoded[i])
    }
    return ab
  }

  encode2(value: string): ArrayBuffer {
    const te = new TextEncoder()
    const encoded = te.encode("\u0000" + value)
    // const clampedLength = Math.min(2**8-1, encoded.byteLength - 1)
    encoded[0] = encoded.byteLength - 1
    return encoded
  }
}