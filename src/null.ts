import AnySchema from "./any";

export default class NullSchema<T extends null = null> extends AnySchema<T> {
    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "null",
        };
    }
}
