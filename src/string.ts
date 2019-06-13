import AnySchema from "./any";

export default class StringSchema extends AnySchema {
    protected options!: AnySchema["options"] & {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
    };

    public constructor(pattern?: RegExp) {
        super();
        this.options = {
            ...this.options,
            pattern,
        };
    }

    public min(length: number): StringSchema {
        this.options.minLength = length;
        return this;
    }

    public max(length: number): StringSchema {
        this.options.maxLength = length;
        return this;
    }

    public toSchema(id?: string) {
        let schema = super.toSchema(id);
        let pattern: string | undefined;
        if (this.options.pattern != null) {
            pattern = new RegExp(this.options.pattern, "").toString();
        }

        return {
            ...schema,
            type: "string",
            minLength: this.options.minLength,
            maxLength: this.options.maxLength,
            pattern,
        };
    }
}
