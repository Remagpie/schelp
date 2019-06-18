import AnySchema from "./any";
import ArraySchema from "./array";
import BooleanSchema from "./boolean";
import IntegerSchema from "./integer";
import NullSchema from "./null";
import NumberSchema from "./number";
import ObjectSchema from "./object";
import StringSchema from "./string";
import TupleSchema from "./tuple";

export function any(): AnySchema {
    return new AnySchema();
}

export function array<T>(item: AnySchema<T>): ArraySchema<T> {
    return new ArraySchema<T>(item);
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

export function object<T extends object>(
    fields: { [K in keyof T]: AnySchema<T[K]> },
): ObjectSchema<T> {
    return new ObjectSchema(fields);
}

export function string(pattern?: RegExp): StringSchema<string> {
    return new StringSchema(pattern);
}

export function tuple<T extends any[]>(
    ...items: { [I in keyof T]: AnySchema<T[I]> }
): TupleSchema<T> {
    return new TupleSchema<T>(items);
}

export type TypeOf<T extends AnySchema> = T extends AnySchema<infer S>
    ? S
    : never;
