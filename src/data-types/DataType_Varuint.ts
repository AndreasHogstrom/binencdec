import encode from "../varint/encode";
import decode from "../varint/decode";
import DataType from "./DataType"

export default class DataType_Varuint extends DataType<number> {
  decode(dataView: DataView, offset: number): [number, number] {
    return decode(dataView.buffer.slice(offset))
  }
  encode(value: number): ArrayBuffer {
    return encode(value)
  }
  randomValue(): number {
    throw new Error("Method not implemented.");
  }
}
