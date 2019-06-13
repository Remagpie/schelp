export const SCHEMA = "http://json-schema.org/draft-07/schema#";

export default class AnySchema {
    public toSchema(id?: string) {
        return {
            $schema: SCHEMA,
            $id: id,
        };
    }
}
