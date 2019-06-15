import AnySchema from "./any";
import IntegerSchema from "./integer";
import NumberSchema from "./number";
import StringSchema from "./string";

export function any(): AnySchema {
    return new AnySchema();
}

export function integer(): IntegerSchema {
    return new IntegerSchema();
}

export function number(): NumberSchema {
    return new NumberSchema();
}

export function string(pattern?: RegExp): StringSchema {
    return new StringSchema(pattern);
}
