export const SCHEMA = "http://json-schema.org/draft-07/schema#";

export default class AnySchema {
    protected options: {};

    public constructor() {
        this.options = {};
    }

    public toSchema(id?: string) {
        return {
            $schema: SCHEMA,
            $id: id,
        };
    }
}
