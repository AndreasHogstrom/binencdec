import { test, expect } from "vitest"
import DataType_Uint48 from "./DataType_Uint48"

test.each([
  [0, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer],
  [1, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).buffer],
  [128, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x80]).buffer],
  [1000, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x03, 0xE8]).buffer],
  [80000, new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x38, 0x80]).buffer],
  [134217728, new Uint8Array([0x00, 0x00, 0x08, 0x00, 0x00, 0x00]).buffer],
  [4294966296, new Uint8Array([0x00, 0x00, 0xFF, 0xFF, 0xFC, 0x18]).buffer],
  [1727954663161, new Uint8Array([0x01, 0x92, 0x52, 0x1F, 0xB6, 0xF9]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Uint48("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer, 0],
  [new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).buffer, 1],
  [new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x80]).buffer, 128],
  [new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x03, 0xE8]).buffer, 1000],
  [new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x38, 0x80]).buffer, 80000],
  [new Uint8Array([0x00, 0x00, 0x08, 0x00, 0x00, 0x00]).buffer, 134217728],
  [new Uint8Array([0x00, 0x00, 0xFF, 0xFF, 0xFC, 0x18]).buffer, 4294966296],
  [new Uint8Array([0x01, 0x92, 0x52, 0x1F, 0xB6, 0xF9]).buffer, 1727954663161],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Uint48("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Uint48("test_field")
  const ab = dt.encode(1000)
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(1000)
})