import NumberSchema from "./number";

export default class IntegerSchema<T extends number> extends NumberSchema<T> {
    public toSchema(id?: string) {
        const schema = super.toSchema(id);

        return {
            ...schema,
            type: "integer",
        };
    }
}
