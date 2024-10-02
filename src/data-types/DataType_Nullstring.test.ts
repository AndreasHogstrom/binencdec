import { test, expect } from "vitest"
import DataType_Nullstring from "./DataType_Nullstring"

test.each([
  ["test", new Uint8Array([0x74, 0x65, 0x73, 0x74, 0x00]).buffer],
  ["", new Uint8Array([0x00]).buffer],
  ["e\u0000", new Uint8Array([0x65, 0x00]).buffer],
  ["e\u0000e", new Uint8Array([0x65, 0x65, 0x00]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Nullstring("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x74, 0x65, 0x73, 0x74, 0x00]).buffer, "test"],
  [new Uint8Array([0x00]).buffer, ""],
  [new Uint8Array([0x65, 0x00]).buffer, "e"],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Nullstring("test_field")
  const [res, consumed] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
  expect(consumed).toStrictEqual(a.byteLength)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Nullstring("test_field")
  const ab = dt.encode("test")
  const bigAb = new Uint8Array(100)
  const abu8a = new Uint8Array(ab)
  for (let i = 0; i < abu8a.byteLength; i++) {
    bigAb[52 + i] = abu8a[i]
  }

  const [res] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual("test")
})