import AnySchema from "./any";

export default class ObjectSchema<T extends object> extends AnySchema<T> {
    protected fields: { [K in keyof T]: AnySchema<T[K]> };

    public constructor(fields: { [K in keyof T]: AnySchema<T[K]> }) {
        super();
        this.fields = fields;
    }

    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        const required: string[] = [];
        const properties: Record<keyof T, {}> = {} as any;
        for (const key of Object.keys(this.fields) as (keyof T)[]) {
            if (!this.fields[key].isOptional()) {
                required.push(key as string);
            }
            properties[key] = this.fields[key].toSchema(undefined, false);
        }

        return {
            ...schema,
            type: "object",
            required,
            properties,
            additionalProperties: false,
        };
    }
}
