import AnySchema from "./any";

export default class StringSchema<T extends string> extends AnySchema<T> {
    protected options!: AnySchema<T>["options"] & {
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

    public min(length: number): StringSchema<T> {
        this.options.minLength = length;
        return this;
    }

    public max(length: number): StringSchema<T> {
        this.options.maxLength = length;
        return this;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        let schema = super.toSchema(id, asRoot);
        let pattern: string | undefined;
        if (this.options.pattern != null) {
            pattern = new RegExp(this.options.pattern, "")
                .toString()
                .slice(1, -1);
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
