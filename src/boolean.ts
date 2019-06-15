import AnySchema from "./any";

export default class BooleanSchema<T extends boolean> extends AnySchema<T> {
    public toSchema(id?: string) {
        const schema = super.toSchema(id);

        return {
            ...schema,
            type: "boolean",
        };
    }
}
