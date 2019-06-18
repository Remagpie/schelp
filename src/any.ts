export const SCHEMA = "http://json-schema.org/draft-07/schema#";

export default class AnySchema<T = any> {
    protected options: {
        optional: boolean;
        enum?: T[];
    };

    public constructor() {
        this.options = {
            optional: false,
        };
    }

    public isOptional(): boolean {
        return this.options.optional;
    }

    public optional() {
        this.options.optional = true;
        return this;
    }

    public enum<U extends T>(values: U[]): AnySchema<U> {
        this.options.enum = values;
        return (this as unknown) as AnySchema<U>;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        return {
            $schema: asRoot ? SCHEMA : undefined,
            $id: id,
            enum: this.options.enum,
        };
    }
}
