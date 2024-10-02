import DataType from "./DataType"

export default class DataType_String32 extends DataType<string> {
  size = 32
  randomValue(): string {
    const u8a = new Uint8Array(this.size)
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21)
    }
    const td = new TextDecoder()
    return td.decode(u8a)
  }
  decode(dataView: DataView, offset: number): [string, number] {
    const decoder = new TextDecoder()

    return [decoder.decode(dataView.buffer.slice(offset, offset + this.size)).replaceAll("\u0000", ""), this.size]
  }

  encode(value: string): ArrayBuffer {
    const te = new TextEncoder()
    const encoded = te.encode(value)
    const ab = new ArrayBuffer(this.size)
    const dw = new DataView(ab)
    for (let i = 0; i < this.size; i++) {
      dw.setUint8(i, encoded[i])
    }
    return ab
  }
}
