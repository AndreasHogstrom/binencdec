import { test, expect } from "vitest"
import DataType_Int24 from "./DataType_Int24"

test.each([
  [0, new Uint8Array([0x00, 0x00, 0x00]).buffer],
  [1, new Uint8Array([0x00, 0x00, 0x01]).buffer],
  [128, new Uint8Array([0x00, 0x00, 0x80]).buffer],
  [1000, new Uint8Array([0x00, 0x03, 0xE8]).buffer],
  [80000, new Uint8Array([0x01, 0x38, 0x80]).buffer],
  [-1000, new Uint8Array([0xFF, 0xFC, 0x18]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Int24("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00, 0x00, 0x00]).buffer, 0],
  [new Uint8Array([0x00, 0x00, 0x01]).buffer, 1],
  [new Uint8Array([0x00, 0x00, 0x80]).buffer, 128],
  [new Uint8Array([0x00, 0x03, 0xE8]).buffer, 1000],
  [new Uint8Array([0x01, 0x38, 0x80]).buffer, 80000],
  [new Uint8Array([0xFF, 0xFC, 0x18]).buffer, -1000],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Int24("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Int24("test_field")
  const ab = dt.encode(1000)
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(1000)
})