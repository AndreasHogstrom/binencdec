import Coder from "./Coder"

export default class Decoder extends Coder {
  parse(ab: ArrayBuffer, offset = 0): [Record<string, unknown>, number] {
    const obj: Record<string, unknown> = {}
    const dataView = new DataView(ab)

    for (const [fieldName, dataType] of this.fields) {
      const [value, consumed] = dataType.decode(dataView, offset)
      obj[fieldName] = value
      offset += consumed
    }

    return [obj, offset]
  }

  multiParse(ab: ArrayBuffer): Record<string, unknown>[] {
    const objs = []
    let offset = 0

    while (offset < ab.byteLength) {
      const [obj, nextOffset] = this.parse(ab, offset)
      objs.push(obj)
      offset = nextOffset
    }

    return objs
  }
}
