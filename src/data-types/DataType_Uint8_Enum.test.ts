import { test, expect } from "vitest"
import DataType_Uint8_Enum from "./DataType_Uint8_Enum"

test.each([
  ["abc", new Uint8Array([0x00]).buffer],
  ["def", new Uint8Array([0x01]).buffer],
  ["ghi", new Uint8Array([0x02]).buffer],
  ["unknown", new Uint8Array([0xFF]).buffer],
  ["", new Uint8Array([0xFF]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Uint8_Enum("test_field[abc,def,ghi]")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00]).buffer, "abc"],
  [new Uint8Array([0x01]).buffer, "def"],
  [new Uint8Array([0x02]).buffer, "ghi"],
  [new Uint8Array([0x04]).buffer, undefined],
  [new Uint8Array([0xFF]).buffer, undefined],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Uint8_Enum("test_field[abc,def,ghi]")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Uint8_Enum("test_field[abc,def,ghi]")
  const ab = dt.encode("def")
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual("def")
})