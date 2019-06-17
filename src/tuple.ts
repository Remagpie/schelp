import AnySchema from "./any";

export default class TupleSchema<T extends any[]> extends AnySchema<T> {
    protected options!: AnySchema<T>["options"] & {
        uniqueItems?: boolean;
    };
    protected items: { [I in keyof T]: AnySchema<T[I]> };

    public constructor(items: { [I in keyof T]: AnySchema<T[I]> }) {
        super();
        this.items = items;
    }

    public unique(): TupleSchema<T> {
        this.options.uniqueItems = true;
        return this;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "array",
            minItems: this.items.length,
            maxItems: this.items.length,
            uniqueItems: this.options.uniqueItems,
            items: this.items.map((i) => i.toSchema(undefined, false)),
        };
    }
}
