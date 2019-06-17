import AnySchema from "./any";

export default class BooleanSchema<T extends boolean> extends AnySchema<T> {
    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "boolean",
        };
    }
}
