import { test, expect } from "vitest"
import DataType_Float32 from "./DataType_Float32"

test.each([
  [0, new Uint8Array([0x00, 0x00, 0x00, 0x00]).buffer],
  [1, new Uint8Array([0x3f, 0x80, 0x00, 0x00]).buffer],
  [128, new Uint8Array([0x43, 0x00, 0x00, 0x00]).buffer],
  [100.5323, new Uint8Array([0x42, 0xc9, 0x10, 0x8a]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Float32("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00, 0x00, 0x00, 0x00]).buffer, 0],
  [new Uint8Array([0x3f, 0x80, 0x00, 0x00]).buffer, 1],
  [new Uint8Array([0x43, 0x00, 0x00, 0x00]).buffer, 128],
  [new Uint8Array([0x42, 0xc9, 0x10, 0x8a]).buffer, 100.5323],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Float32("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toBeCloseTo(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Float32("test_field")
  const ab = dt.encode(100.5323)
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toBeCloseTo(100.5323)
})