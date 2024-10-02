import DataType from "./DataType"

export default class DataType_Flags8 extends DataType<Record<string, boolean>> {
  fields: string[]

  constructor(fieldName: string) {
    super(fieldName)
    const [, name, fields] = /^(.+?)\[(.+,?)+\]$/.exec(fieldName) ?? []
    this.name = name
    this.fields = fields.split(",")
  }

  randomValue(): Record<string, boolean> {
    return this.fields.reduce((acc, curr) => ({ ...acc, [curr]: Math.random() > 0.5 }), {})
  }

  decode(dataView: DataView, offset: number): [Record<string, boolean>, number] {
    const value = dataView.getUint8(offset)
    return [this.fields.reduce((acc, curr, idx) => ({
      ...acc,
      [curr]: (value & 2**idx) === 2**idx
    }), {}), 1]
  }

  encode(value: Record<string, boolean>): ArrayBuffer {
    const u8a = new Uint8Array(1)

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (value[field]) {
        u8a[0] |= 2**i
      }
    }

    return u8a.buffer
  }
}
