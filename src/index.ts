import AnySchema from "./any";
import BooleanSchema from "./boolean";
import IntegerSchema from "./integer";
import NullSchema from "./null";
import NumberSchema from "./number";
import StringSchema from "./string";

export function any(): AnySchema {
    return new AnySchema();
}

export function boolean(): BooleanSchema {
    return new BooleanSchema();
}

export function integer(): IntegerSchema {
    return new IntegerSchema();
}

export function nul(): NullSchema {
    return new NullSchema();
}

export function number(): NumberSchema {
    return new NumberSchema();
}

export function string(pattern?: RegExp): StringSchema {
    return new StringSchema(pattern);
}
