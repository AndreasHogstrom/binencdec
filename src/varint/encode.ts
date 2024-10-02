export default function encode(value: number): ArrayBuffer {
  const u8a = new Uint8Array(4)
  u8a[3] = value & 0b0111_1111
  u8a[2] = (value & 0b0011_1111_1000_0000) >> 7
  u8a[1] = (value & 0b0001_1111_1100_0000_0000_0000) >> 7*2
  u8a[0] = (value & 0b0000_1111_1110_0000_0000_0000_0000_0000) >> 7*3

  if (u8a[0] > 0) {
    u8a[0] |= 0b1000_0000
    u8a[1] |= 0b1000_0000
    u8a[2] |= 0b1000_0000
    return u8a.buffer
  }
  if (u8a[1] > 0) {
    u8a[1] |= 0b1000_0000
    u8a[2] |= 0b1000_0000
    return u8a.buffer.slice(1)
  }
  if (u8a[2] > 0) {
    u8a[2] |= 0b1000_0000
    return u8a.buffer.slice(2)
  }

  return u8a.buffer.slice(3)
}
