import { test, expect } from "vitest"
import DataType_Int16 from "./DataType_Int16"

test.each([
  [0, new Uint8Array([0x00, 0x00]).buffer],
  [1, new Uint8Array([0x00, 0x01]).buffer],
  [128, new Uint8Array([0x00, 0x80]).buffer],
  [1000, new Uint8Array([0x03, 0xE8]).buffer],
  [-1000, new Uint8Array([0xfc, 0x18]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Int16("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00, 0x00]).buffer, 0],
  [new Uint8Array([0x00, 0x01]).buffer, 1],
  [new Uint8Array([0x00, 0x80]).buffer, 128],
  [new Uint8Array([0x03, 0xE8]).buffer, 1000],
  [new Uint8Array([0xfc, 0x18]).buffer, -1000],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Int16("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Int16("test_field")
  const ab = dt.encode(1000)
  const bigAb = new Uint8Array(100)
  bigAb[52] = new Uint8Array(ab)[0]
  bigAb[53] = new Uint8Array(ab)[1]

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(1000)
})