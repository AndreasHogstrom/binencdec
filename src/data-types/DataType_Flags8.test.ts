import { test, expect } from "vitest"
import DataType_Flags8 from "./DataType_Flags8"


test.each([
  [{}, new Uint8Array([0x00]).buffer],
  [{ admin: true }, new Uint8Array([0b0000_0001]).buffer],
  [{ admin: false }, new Uint8Array([0b0000_0000]).buffer],
  [{ corrupt: true }, new Uint8Array([0b0000_0010]).buffer],
  [{ ready: true }, new Uint8Array([0b0000_0100]).buffer],
  [{ admin: true, ready: true }, new Uint8Array([0b0000_0101]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_Flags8("test_field[admin,corrupt,ready]")
  expect(dt.name).toEqual("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00]).buffer, { admin: false, corrupt: false, ready: false }],
  [new Uint8Array([0b0000_0001]).buffer, { admin: true, corrupt: false, ready: false }],
  [new Uint8Array([0b0000_0000]).buffer, { admin: false, corrupt: false, ready: false }],
  [new Uint8Array([0b0000_0010]).buffer, { admin: false, corrupt: true, ready: false }],
  [new Uint8Array([0b0000_0100]).buffer, { admin: false, corrupt: false, ready: true }],
  [new Uint8Array([0b0000_0101]).buffer, { admin: true, corrupt: false, ready: true }],
])("Decode #%#", (a, expected) => {
  const dt = new DataType_Flags8("test_field[admin,corrupt,ready]")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

test("Decode at intermediate position", () => {
  const dt = new DataType_Flags8("test_field[admin,corrupt,ready]")
  const ab = dt.encode({ admin: true, corrupt: false, ready: true })
  const bigAb = new Uint8Array(100)
  bigAb[52] = new Uint8Array(ab)[0]

  const [res, consumed] = dt.decode(new DataView(bigAb.buffer), 52)

  expect(res).toStrictEqual({ admin: true, corrupt: false, ready: true })
  expect(consumed).toEqual(ab.byteLength)
})