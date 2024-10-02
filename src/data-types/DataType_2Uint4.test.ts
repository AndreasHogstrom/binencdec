import { test, expect } from "vitest"
import DataType_2Uint4 from "./DataType_2Uint4"

test.each<[[number, number], ArrayBufferLike]>([
  [[0, 0], new Uint8Array([0x00]).buffer],
  [[0, 1], new Uint8Array([0x10]).buffer],
  [[1, 0], new Uint8Array([0x01]).buffer],
  [[1, 1], new Uint8Array([0x11]).buffer],
  [[8, 2], new Uint8Array([0x28]).buffer],
])("Encode #%#", (a, expected) => {
  const dt = new DataType_2Uint4("test_field")
  const res = dt.encode(a)

  expect(res).toBeInstanceOf(ArrayBuffer)
  expect(res.byteLength).toEqual(expected.byteLength)

  expect(new Uint8Array(res)).toEqual(new Uint8Array(expected))
})

test.each([
  [new Uint8Array([0x00]).buffer, [0, 0]],
  [new Uint8Array([0x10]).buffer, [0, 1]],
  [new Uint8Array([0x01]).buffer, [1, 0]],
  [new Uint8Array([0x11]).buffer, [1, 1]],
  [new Uint8Array([0x28]).buffer, [8, 2]],

])("Decode #%#", (a, expected) => {
  const dt = new DataType_2Uint4("test_field")
  const [res] = dt.decode(new DataView(a), 0)

  expect(res).toStrictEqual(expected)
})

// test("Decode at intermediate position", () => {
//   const dt = new DataType_2Uint4("test_field")
//   const ab = dt.encode(1000)
//   const bigAb = new Uint8Array(100)
//   bigAb[52] = new Uint8Array(ab)[0]
//   bigAb[53] = new Uint8Array(ab)[1]

//   const [res] = dt.decode(new DataView(bigAb.buffer), 52)

//   expect(res).toStrictEqual(1000)
// })