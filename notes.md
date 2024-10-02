# Binary format encoder and decoder
## Schema
### Format
```
[version] [[field_name] [data_type]]...
```

*EBNF*
```ebnf
Format    ::= Version FieldSpec*
Version   ::= String
FieldSpec ::= WS FieldName WS DataType
FieldName ::= String ( '[' String ( ',' String )* ']' )?
DataType  ::= String
String    ::= #'[A-Za-z0-9_]+'
WS        ::= #'\s|\n'
```
Whitespace between keywords can be space, tabs or newlines.

### Example
```
1
name varstring8
age uint8
score int16
nationality[swedish,american,german] uint16_enum
```

## Data Types
| Name        | Byte Size  | Description                                            |
|-------------|------------|--------------------------------------------------------|
|  int8        | 1          | 8 bit integer, signed                                  |
| uint8       | 1          | 8 bit integer, unsigned                                |
|  int16       | 2          | 16 bit integer, signed                                 |
| uint16      | 2          | 16 bit integer, unsigned                               |
|  int32       | 4          | 32 bit integer, signed                                 |
| uint32      | 4          | 32 bit integer, unsigned                               |
| float32     | 4          | 32 bit float                                           |
| varuint     | 1-4        | Variable length (max 28 bit) integer, unsigned |
| bool        | 1          | Boolean                                                |
| string32    | 32         | 32 byte string, fixed size                             |
| varstring8  | 1-256      | Variable 0-2^8-1 byte string, 1 byte used for length     |
| varstring32 | 1-268435456 | Variable 0-2^28-1 byte string, 1-4 bytes used for length |
| nullstring  | 1-inf      | Null byte terminated string  |
| uint16_enum | 2          | Enum value using a 16 bit integer, unsigned            |
| flags8      | 1          | 8 booleans in 1 byte |
| 2uint4 | 1 | Two 4 bit integers, unsigned, in one byte  |
| repeat | ? | NYI. Please add support for repeats/lists |

### Numbers
Integers can be stored in 1, 2, or 4 byte types with optional signage.  
Decimals can be stored in a 4 byte float.

### bool
The `bool` type uses 1 byte to store a 1 bit true or false value. Very wasteful.

```js
schema = "1 name bool"
encode(true) == ArrayBuffer([0x01])
decode(ArrayBuffer8([0x01])) === true
```

### string32
The `string32` type uses exactly 32 bytes no matter how long or short the actual value is, but requires no length information. Recommended to use if the string length is highly likely to be exact 32 bytes.

### varstring8
The `varstring8` type uses 0-32 bytes depending on the length of the value. With 1 extra byte used to store the length used. Allowing for string lenghts of 0 to 255 bytes.
```
Byte Length
  |
0xXX 0xXX  ...
       |
      UTF-8 string
```
```js
schema = "1 name varstring8"
encode("test") == ArrayBuffer([0x04, 0x74, 0x65, 0x73, 0x74])
decode(ArrayBuffer([0x04, 0x74, 0x65, 0x73, 0x74])) == "test"
```

### varstring32
The `varstring32` type uses 1 to 4 bytes for length information, packed in as few bytes as possible.
The first bit in each byte indicates if the _next_ byte is also part of the length information.
1 meaning continue, 0 meaning stop (and start reading string values). For example:

```
0b0000_1000 (8) becomes 0b0000_1000 (8)
0b0000_0011_1110_1000 (1000) becomes 0b1000_0111_0110_1000 (34664)
```

4 bits are "wasted" and thus the maximum storable value is 2^(32-4)-1.

### uint16_enum
The `uint16_enum` value uses 2 bytes (uint16) to store a numerical value mapped to a string value specified i the schema. Allowing for up to 65536 different values if required.

The schema field is specified as following:
```
nationality[swedish,american,german] uint16_enum
```
Where the field_name would become nationality and the enum values would be `0 = swedish`, `1 = american` and `2 = german`.

```js
schema = "1 name[swedish,american,german] uint16_enum"
encode("german") === ArrayBuffer([0x02])
decode(ArrayBuffer([0x02])) === "german"
```

### flags8
The `flags8` type stores up to 8 different boolean values in 1 byte. The schema specifies the string representations or names.

```
options[admin,corrupt,ready] flags8
```
Where the field_name would become options and the first 3 bits indicate true or false for `admin`, `corrupt` and `ready`.

```js
schema = "1 name[admin,corrupt,ready] flags8"
encode({ admin: true, corrupt: false, ready: true }) == ArrayBuffer([0b0000_0101])
decode([0b0000_0101]) == { admin: true, corrupt: false, ready: true }
```

### 2uint4
The `2uint4` type stores two 4 bit integers in a single byte.

```
            First integer
            |    |
1 byte: XXXX XXXX
       |    |
       Second integer
```

```js
schema = "1 name flags8"
encode([5, 2]) == ArrayBuffer([0x25]) == ArrayBuffer([0b0101_0010])
decode(ArrayBuffer([0x25])) = [5, 2]
```
