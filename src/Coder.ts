import {
  DataType_2Uint4,
  DataType_Boolean,
  DataType_Flags8,
  DataType_Float32,
  DataType_Int16,
  DataType_Int24,
  DataType_Int32,
  DataType_Int8,
  DataType_NullableInt15,
  DataType_NullableInt23,
  DataType_NullableUint23,
  DataType_NullableUint7,
  DataType_Nullstring,
  DataType_String32,
  DataType_Uint16_Enum,
  DataType_Uint16,
  DataType_Uint32,
  DataType_Uint48,
  DataType_Uint8_Enum,
  DataType_Uint8,
  DataType_Varstring32,
  DataType_Varstring8,
  DataType_Varuint,
  DataType,
} from "./data-types"

export default class Coder<TObject extends Record<string, unknown>> {
  static dataTypes: Record<string, new (fieldName: string) => DataType<unknown>> = {
    "2int4": DataType_2Uint4,
    bool: DataType_Boolean,
    flags8: DataType_Flags8,
    float32: DataType_Float32,
    int16: DataType_Int16,
    int24: DataType_Int24,
    int32: DataType_Int32,
    int8: DataType_Int8,
    nullable_int15: DataType_NullableInt15,
    nullable_int23: DataType_NullableInt23,
    nullable_uint23: DataType_NullableUint23,
    nullable_uint7: DataType_NullableUint7,
    nullstring: DataType_Nullstring,
    string32: DataType_String32,
    uint16_enum: DataType_Uint16_Enum,
    uint16: DataType_Uint16,
    uint32: DataType_Uint32,
    uint48: DataType_Uint48,
    uint8_enum: DataType_Uint8_Enum,
    uint8: DataType_Uint8,
    varstring32: DataType_Varstring32,
    varstring8: DataType_Varstring8,
    varuint: DataType_Varuint,
  }
  fields: [string, DataType<unknown>][]
  constructor(fields: [string, string][]) {
    this.fields = fields.map(([name, type]) => {
      if (!(type in Coder.dataTypes)) {
        throw new Error(`Unexpected type: ${type} for field ${name}`)
      }

      const dt = new Coder.dataTypes[type](name)
      return [dt.name, dt]
    })
  }
}
