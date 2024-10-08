export default abstract class DataType<T> {
  name: string
  constructor(fieldName: string) {
    this.name = fieldName
  }
  abstract decode(dataView: DataView, offset: number): [T, number]
  abstract encode(value: T): ArrayBuffer
  abstract randomValue(): T
}
