import NumberSchema from "./number";

export default class IntegerSchema<T extends number> extends NumberSchema<T> {
    public toSchema(id?: string, asRoot: boolean = true) {
        const schema = super.toSchema(id, asRoot);

        return {
            ...schema,
            type: "integer",
        };
    }
}
