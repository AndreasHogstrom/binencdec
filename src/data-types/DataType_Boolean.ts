import DataType from "./DataType"

export default class DataType_Boolean extends DataType<boolean> {
  randomValue(): boolean {
    throw new Error("Method not implemented.")
  }
  decode(dataView: DataView, offset: number): [boolean, number] {
    return [dataView.getUint8(offset) !== 0, 1]
  }
  encode(value: boolean): ArrayBuffer {
    const ab = new ArrayBuffer(1)
    const dw = new DataView(ab)
    dw.setUint8(0, value ? 1 : 0)
    return ab
  }
}
