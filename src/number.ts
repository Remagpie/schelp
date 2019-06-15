import AnySchema from "./any";

export default class NumberSchema extends AnySchema {
    protected options!: AnySchema["options"] & {
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

    public min(value: number, exclusive: boolean = false): NumberSchema {
        if (exclusive) {
            this.options.minimum = undefined;
            this.options.exclusiveMinimum = value;
        } else {
            this.options.minimum = value;
            this.options.exclusiveMinimum = undefined;
        }
        return this;
    }

    public max(value: number, exclusive: boolean = false): NumberSchema {
        if (exclusive) {
            this.options.maximum = undefined;
            this.options.exclusiveMaximum = value;
        } else {
            this.options.maximum = value;
            this.options.exclusiveMaximum = undefined;
        }
        return this;
    }

    public multipleOf(value: number): NumberSchema {
        this.options.multipleOf = value;
        return this;
    }

    public toSchema(id?: string) {
        const schema = super.toSchema(id);

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
