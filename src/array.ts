import AnySchema from "./any";

export default class ArraySchema<T> extends AnySchema<T[]> {
    protected options!: AnySchema<T[]>["options"] & {
        minItems?: number;
        maxItems?: number;
        uniqueItems?: boolean;
    };
    protected item: AnySchema<T>;

    public constructor(item: AnySchema<T>) {
        super();
        this.item = item;
    }

    public min(length: number): ArraySchema<T> {
        this.options.minItems = length;
        return this;
    }

    public max(length: number): ArraySchema<T> {
        this.options.maxItems = length;
        return this;
    }

    public unique(): ArraySchema<T> {
        this.options.uniqueItems = true;
        return this;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "array",
            minItems: this.options.minItems,
            maxItems: this.options.maxItems,
            uniqueItems: this.options.uniqueItems,
            items: this.item.toSchema(undefined, false),
        };
    }
}
