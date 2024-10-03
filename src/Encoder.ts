import Coder from "./Coder"

export default class Encoder<TObject extends Record<string, unknown>> extends Coder<TObject> {
  make(obj: TObject): ArrayBuffer {
    const abs: ArrayBuffer[] = []

    for (const [fieldName, dataType] of this.fields) {
      abs.push(dataType.encode(obj[fieldName]))
    }

    const finalDw = new Uint8Array(abs.reduce((acc, curr) => acc + curr.byteLength, 0))
    let offset = 0
    for (const ab of abs) {
      const dw = new Uint8Array(ab)
      for (let i = 0; i < dw.length; i++) {
        finalDw[offset + i] = dw[i]
      }
      offset += ab.byteLength
    }

    return finalDw.buffer
  }

  multiMake(objs: TObject[]): ArrayBuffer {
    const abs = []
    for (const obj of objs) {
      abs.push(this.make(obj))
    }

    const finalAb = new ArrayBuffer(abs.reduce((acc, curr) => acc + curr.byteLength, 0))
    const finalDw = new DataView(finalAb)
    let offset = 0
    for (const ab of abs) {
      const dw = new DataView(ab)
      for (let i = 0; i < ab.byteLength; i++) {
        finalDw.setUint8(offset + i, dw.getUint8(i))
      }
      offset += ab.byteLength
    }

    return finalAb
  }

  randomMake(): ArrayBuffer {
    return this.make(this.fields.reduce((acc, [fieldName, dataType]) => {
      return {
        ...acc,
        [fieldName]: dataType.randomValue()
      }
    }, {} as TObject))
  }
}
