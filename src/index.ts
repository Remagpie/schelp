import AnySchema from "./any";
import StringSchema from "./string";

export function any(): AnySchema {
    return new AnySchema();
}

export function string(pattern?: RegExp): StringSchema {
    return new StringSchema(pattern);
}
