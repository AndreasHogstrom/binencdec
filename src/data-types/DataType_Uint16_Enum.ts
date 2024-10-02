import DataType from "./DataType"

export default class DataType_Uint16_Enum extends DataType<string> {
  size = 2
  name: string
  values: string[]
  constructor(fieldName: string) {
    super(fieldName)
    const [, name, values] = /^(.+?)\[(.+,?)+\]$/.exec(fieldName) ?? []
    this.name = name
    this.values = values.split(",")
  }
  decode(dataView: DataView, offset: number): [string, number] {
    return [this.values[dataView.getUint16(offset)], this.size]
  }
  encode(value: string): ArrayBuffer {
    const ab = new ArrayBuffer(this.size)
    const dw = new DataView(ab)
    dw.setUint16(0, this.values.indexOf(value))
    return ab
  }
  randomValue(): string {
    return this.values[Math.floor(Math.random() * this.values.length)]
  }
}
