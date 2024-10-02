import DataType from "./DataType"

export default class DataType_BaseNumber extends DataType<number> {
  size = 0

  dataViewGet(dataView: DataView, offset: number): number {
    return dataView.getUint8(offset)
  }

  decode(dataView: DataView, offset: number): [number, number] {
    return [this.dataViewGet(dataView, offset), this.size]
  }

  dataViewSet(dataView: DataView, value: number): void {
    dataView.setUint8(0, value)
  }

  encode(value: number): ArrayBuffer {
    const ab = new ArrayBuffer(this.size)
    const dw = new DataView(ab)
    this.dataViewSet(dw, value)
    return ab
  }

  randomValue() {
    const u8a = new Uint8Array(this.size)
    for (let i = 0; i < u8a.length; i++) {
      u8a[i] = Math.floor(Math.random() * 2**8)
    }
    return this.decode(new DataView(u8a.buffer), 0)[0]
  }
}
