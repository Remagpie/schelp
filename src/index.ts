import AnySchema from "./any";
import BooleanSchema from "./boolean";
import IntegerSchema from "./integer";
import NullSchema from "./null";
import NumberSchema from "./number";
import StringSchema from "./string";

export function any(): AnySchema {
    return new AnySchema();
}

export function boolean(): BooleanSchema<boolean> {
    return new BooleanSchema();
}

export function integer(): IntegerSchema<number> {
    return new IntegerSchema();
}

export function nul(): NullSchema<null> {
    return new NullSchema();
}

export function number(): NumberSchema<number> {
    return new NumberSchema();
}

export function string(pattern?: RegExp): StringSchema<string> {
    return new StringSchema(pattern);
}

export type TypeOf<T extends AnySchema> = T extends AnySchema<infer S>
    ? S
    : never;
