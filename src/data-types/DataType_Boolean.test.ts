import { test, expect } from "vitest"
import DataType_Boolean from "./DataType_Boolean"


test.each([
  [true, new Uint8Array([0x01]).buffer],
  [false, new Uint8Array([0x00]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Boolean("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x01]).buffer, true],
  [new Uint8Array([0x00]).buffer, false],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Boolean("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Boolean("test_field")
  const ab = dt.encode(true)
  const bigAb = new Uint8Array(100)
  bigAb[52] = new Uint8Array(ab)[0]

  const [res, consumed] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(true)
  expect(consumed).toEqual(ab.byteLength)
})