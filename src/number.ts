import AnySchema from "./any";

export default class NumberSchema<T extends number> extends AnySchema<T> {
    protected options!: AnySchema<T>["options"] & {
        multipleOf?: number;
        minimum?: number;
        maximum?: number;
        exclusiveMinimum?: number;
        exclusiveMaximum?: number;
    };

    public constructor() {
        super();
        this.options = {
            ...this.options,
        };
    }

    public min(value: number, exclusive: boolean = false): NumberSchema<T> {
        if (exclusive) {
            this.options.minimum = undefined;
            this.options.exclusiveMinimum = value;
        } else {
            this.options.minimum = value;
            this.options.exclusiveMinimum = undefined;
        }
        return this;
    }

    public max(value: number, exclusive: boolean = false): NumberSchema<T> {
        if (exclusive) {
            this.options.maximum = undefined;
            this.options.exclusiveMaximum = value;
        } else {
            this.options.maximum = value;
            this.options.exclusiveMaximum = undefined;
        }
        return this;
    }

    public multipleOf(value: number): NumberSchema<T> {
        this.options.multipleOf = value;
        return this;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "number",
            multipleOf: this.options.multipleOf,
            minimum: this.options.minimum,
            maximum: this.options.maximum,
            exclusiveMinimum: this.options.exclusiveMinimum,
            exclusiveMaximum: this.options.exclusiveMaximum,
        };
    }
}
