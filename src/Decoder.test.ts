import { test, expect } from "vitest"
import Decoder from "./Decoder";

test("Parse", () => {
  const decoder = new Decoder<{
    field1: number
    field2: boolean
    field3: number
  }>([
    ["field1", "uint8"],
    ["field2", "bool"],
    ["field3", "int16"],
  ])
  const obj = decoder.parse(new Uint8Array([
    0x64,
    0x01,
    0x03,
    0xE8,
  ]).buffer)[0]

  expect(obj).toStrictEqual({
    field1: 100,
    field2: true,
    field3: 1000,
  })
})

test("Multi parse", () => {
  const decoder = new Decoder<{
    field1: number
    field2: boolean
    field3: number
  }>([
    ["field1", "uint8"],
    ["field2", "bool"],
    ["field3", "int16"],
  ])
  const objs = decoder.multiParse(new Uint8Array([
    0x64,
    0x01,
    0x03,
    0xE8,
    0x05,
    0x00,
    0x00,
    0x08,
  ]).buffer)

  expect(objs).toStrictEqual([
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
})
