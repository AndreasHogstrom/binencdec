import { test, expect } from "vitest"
import { makeDecoder, makeEncoder, parseSchema } from "./schema"
import Decoder from "./Decoder"
import Encoder from "./Encoder"

test("Make encoder", () => {
  expect(makeEncoder("1")).toBeInstanceOf(Encoder)
})

test("Make decoder", () => {
  expect(makeDecoder("1")).toBeInstanceOf(Decoder)
})

test("Parse schema", () => {
  const fields = parseSchema("1 f1 int8 f2 string")
  expect(fields).toStrictEqual([["f1", "int8"], ["f2", "string"]])
})

test("Parse schema, tab whitespace", () => {
  const fields = parseSchema("1\tf1\tint8\tf2\tstring")
  expect(fields).toStrictEqual([["f1", "int8"], ["f2", "string"]])
})

test("Parse schema, newline whitespace", () => {
  const fields = parseSchema("1\nf1\nint8\nf2\nstring")
  expect(fields).toStrictEqual([["f1", "int8"], ["f2", "string"]])
})

test("Unsupported version", () => {
  expect(() => parseSchema("2 a b")).toThrowError("Unsupported schema version")
})
