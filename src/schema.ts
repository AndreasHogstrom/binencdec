import Decoder from "./Decoder";
import Encoder from "./Encoder";

export function makeDecoder(schema: string): Decoder {
  return new Decoder(parseSchema(schema))
}

export function makeEncoder(schema: string): Encoder {
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
