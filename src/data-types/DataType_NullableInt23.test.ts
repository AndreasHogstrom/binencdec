import { test, expect } from "vitest"
import DataType_NullableInt23 from "./DataType_NullableInt23"

test.each([
  [0, new Uint8Array([0b0000_0000, 0b0000_0000, 0b0000_0000]).buffer],
  [1, new Uint8Array([0b0000_0000, 0b0000_0000, 0b0000_0001]).buffer],
  [127, new Uint8Array([0b0000_0000, 0b0000_0000, 0b0111_1111]).buffer],
  [1000, new Uint8Array([0b0000_0000, 0b0000_0011, 0b1110_1000]).buffer],
  [-1000, new Uint8Array([0x7F, 0xFC, 0x18]).buffer],
  [null, new Uint8Array([0b1000_0000, 0b0000_0000, 0b0000_0000]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_NullableInt23("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0b0000_0000, 0b0000_0000, 0b0000_0000]).buffer, 0],
  [new Uint8Array([0b0000_0000, 0b0000_0000, 0b0000_0001]).buffer, 1],
  [new Uint8Array([0b0000_0000, 0b0000_0000, 0b0111_1111]).buffer, 127],
  [new Uint8Array([0b0000_0000, 0b0000_0011, 0b1110_1000]).buffer, 1000],
  [new Uint8Array([0x7F, 0xFC, 0x18]).buffer, -1000],
  [new Uint8Array([0b1000_0000, 0b0000_0000, 0b0000_0000]).buffer, null],
  [new Uint8Array([0b1000_0000, 0b0000_0000, 0b0000_0000]).buffer, null],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_NullableInt23("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_NullableInt23("test_field")
  const ab = dt.encode(1000)
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(1000)
})