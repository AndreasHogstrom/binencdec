import { DataType } from "./data-types";
export default class Coder<TObject extends Record<string, unknown>> {
    static dataTypes: Record<string, new (fieldName: string) => DataType<unknown>>;
    fields: [string, DataType<unknown>][];
    constructor(fields: [string, string][]);
}
