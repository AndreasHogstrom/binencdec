import Decoder from "./Decoder";
import Encoder from "./Encoder";

export function makeDecoder<TObject extends Record<string, unknown>>(schema: string): Decoder<TObject> {
  return new Decoder(parseSchema(schema))
}

export function makeEncoder<TObject extends Record<string, unknown>>(schema: string): Encoder<TObject> {
  return new Encoder(parseSchema(schema))
}

export function parseSchema(schema: string) {
  const [version, ...rest] = schema.trim().split(/\s+|\n/)
  switch (version) {
    case "1":
      return rest.reduce<string[][]>((acc, curr, index) => {
        if (index % 2 === 0) {
          acc.push([curr])
        } else {
          acc.at(-1)!.push(curr)
        }
        return acc
      }, []) as [string, string][]
    default:
      throw new Error(`Unsupported schema version: ${version}`)
  }
}
