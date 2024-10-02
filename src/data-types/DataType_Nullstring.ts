import DataType from "./DataType"

export default class DataType_Nullstring extends DataType<string> {
  randomValue(): string {
    const u8a = new Uint8Array(Math.floor(Math.random() * 2**8))
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * (0x7F - 0x21) + 0x21)
    }
    const td = new TextDecoder()
    return td.decode(u8a)
  }

  decode(dataView: DataView, offset: number): [string, number] {
    let i = 0
    while (dataView.getUint8(offset + i) !== 0) {
      i++
    }

    const td = new TextDecoder()
    const value = td.decode(dataView.buffer.slice(offset, offset + i))

    return [value, i + 1]
  }

  encode(value: string): ArrayBuffer {
    const te = new TextEncoder()
    const encoded = te.encode(value.replaceAll("\u0000", "") + "\u0000")
    return encoded.buffer
  }
}
