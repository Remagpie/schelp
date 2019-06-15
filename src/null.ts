import AnySchema from "./any";

export default class NullSchema<T extends null = null> extends AnySchema<T> {
    public toSchema(id?: string) {
        const schema = super.toSchema(id);

        return {
            ...schema,
            type: "null",
        };
    }
}
