import { DataType } from "./data-types";
export default class Coder {
    static dataTypes: Record<string, new (fieldName: string) => DataType<unknown>>;
    fields: [string, DataType<unknown>][];
    constructor(fields: [string, string][]);
}
