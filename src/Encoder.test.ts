import { test, expect } from "vitest"
import Encoder from "./Encoder";

test("Make", () => {
  const encoder = new Encoder<{
    field1: number
    field2: boolean
    field3: number
  }>([
    ["field1", "uint8"],
    ["field2", "bool"],
    ["field3", "int16"],
  ])
  const ab = encoder.make({
    field1: 100,
    field2: true,
    field3: 1000,
  })

  expect(new Uint8Array(ab)).toStrictEqual(new Uint8Array([
    0x64,
    0x01,
    0x03,
    0xE8,
  ]))
})

test.skip("Unknown field ignored", () => {})
test("Multi make", () => {
  const encoder = new Encoder<{
    field1: number
    field2: boolean
    field3: number
  }>([
    ["field1", "uint8"],
    ["field2", "bool"],
    ["field3", "int16"],
  ])
  const ab = encoder.multiMake([
    {
      field1: 100,
      field2: true,
      field3: 1000,
    },
    {
      field1: 5,
      field2: false,
      field3: 8,
    },
  ])

  expect(new Uint8Array(ab)).toStrictEqual(new Uint8Array([
    0x64,
    0x01,
    0x03,
    0xE8,
    0x05,
    0x00,
    0x00,
    0x08,
  ]))
})
