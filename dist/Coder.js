"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_types_1 = require("./data-types");
class Coder {
    constructor(fields) {
        this.fields = fields.map(([name, type]) => {
            if (!(type in Coder.dataTypes)) {
                throw new Error(`Unexpected type: ${type} for field ${name}`);
            }
            const dt = new Coder.dataTypes[type](name);
            return [dt.name, dt];
        });
    }
}
Coder.dataTypes = {
    "2int4": data_types_1.DataType_2Uint4,
    bool: data_types_1.DataType_Boolean,
    flags8: data_types_1.DataType_Flags8,
    float32: data_types_1.DataType_Float32,
    int16: data_types_1.DataType_Int16,
    int24: data_types_1.DataType_Int24,
    int32: data_types_1.DataType_Int32,
    int8: data_types_1.DataType_Int8,
    nullable_int15: data_types_1.DataType_NullableInt15,
    nullable_int23: data_types_1.DataType_NullableInt23,
    nullable_uint23: data_types_1.DataType_NullableUint23,
    nullable_uint7: data_types_1.DataType_NullableUint7,
    nullstring: data_types_1.DataType_Nullstring,
    string32: data_types_1.DataType_String32,
    uint16_enum: data_types_1.DataType_Uint16_Enum,
    uint16: data_types_1.DataType_Uint16,
    uint32: data_types_1.DataType_Uint32,
    uint48: data_types_1.DataType_Uint48,
    uint8_enum: data_types_1.DataType_Uint8_Enum,
    uint8: data_types_1.DataType_Uint8,
    varstring32: data_types_1.DataType_Varstring32,
    varstring8: data_types_1.DataType_Varstring8,
    varuint: data_types_1.DataType_Varuint,
};
exports.default = Coder;
