import Coder from "./Coder"

export default class Decoder<TObject extends Record<string, unknown>> extends Coder<TObject> {
  parse(ab: ArrayBuffer, offset = 0): [TObject, number] {
    const obj: Record<string, unknown> = {}
    const dataView = new DataView(ab)

    for (const [fieldName, dataType] of this.fields) {
      const [value, consumed] = dataType.decode(dataView, offset)
      obj[fieldName] = value
      offset += consumed
    }

    return [obj as TObject, offset]
  }

  multiParse(ab: ArrayBuffer): TObject[] {
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
