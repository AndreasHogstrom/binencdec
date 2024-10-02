import { test, expect } from "vitest"
import DataType_Varstring32 from "./DataType_Varstring8"

test.each([
  ["", new Uint8Array([0x00]).buffer],
  ["test", new Uint8Array([
    0x4, 0x74, 0x65, 0x73, 0x74,
  ]).buffer],
  ["lök", new Uint8Array([
    0x4, 0x6C, 0xc3, 0xB6, 0x6B,
  ]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Varstring32("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00]).buffer, ""],
  [new Uint8Array([
    0x4, 0x74, 0x65, 0x73, 0x74,
  ]).buffer, "test"],
  [new Uint8Array([
    0x4, 0x6C, 0xc3, 0xB6, 0x6B,
  ]).buffer, "lök"],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Varstring32("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Varstring32("test_field")
  const ab = dt.encode("test")
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual("test")
})