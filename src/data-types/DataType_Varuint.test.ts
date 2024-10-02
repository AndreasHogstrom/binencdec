import { test, expect } from "vitest"
import DataType_Varuint from "./DataType_Varuint"

test.each([
  [0, new Uint8Array([0x00]).buffer],
  [1, new Uint8Array([0x01]).buffer],
  [128, new Uint8Array([0b1000_0001, 0b0000_0000]).buffer],
  [1000, new Uint8Array([0b1000_0111, 0b0110_1000]).buffer],
  [115688, new Uint8Array([0b1000_0111, 0b1000_0111, 0b0110_1000]).buffer],
  [14795752, new Uint8Array([0b1000_0111, 0b1000_0111, 0b1000_0111, 0b0110_1000]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Varuint("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00]).buffer, 0],
  [new Uint8Array([0x01]).buffer, 1],
  [new Uint8Array([0b1000_0001, 0b0000_0000]).buffer, 128],
  [new Uint8Array([0b1000_0111, 0b0110_1000]).buffer, 1000],
  [new Uint8Array([0b1000_0111, 0b1000_0111, 0b0110_1000]).buffer, 115688],
  [new Uint8Array([0b1000_0111, 0b1000_0111, 0b1000_0111, 0b0110_1000]).buffer, 14795752],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Varuint("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Varuint("test_field")
  const ab = dt.encode(1000)
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual(1000)
})