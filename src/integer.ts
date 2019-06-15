import NumberSchema from "./number";

export default class IntegerSchema extends NumberSchema {
    public toSchema(id?: string) {
        const schema = super.toSchema(id);

        return {
            ...schema,
            type: "integer",
        };
    }
}
