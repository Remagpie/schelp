import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("Tuple", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.tuple(schelp.number(), schelp.string());
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
        const uniqueItems = schelp
            .tuple(schelp.number(), schelp.string())
            .unique();
        expect(ajv.validateSchema(uniqueItems.toSchema("schema"))).to.be.true;
    });

    it("Should accept only tuple values", () => {
        const schema = schelp.tuple(schelp.number(), schelp.string());
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", [])).to.be.false;
        expect(ajv.validate("schema", [42])).to.be.false;
        expect(ajv.validate("schema", [42, "a"])).to.be.true;
        expect(ajv.validate("schema", [42, "a", false])).to.be.false;
        expect(ajv.validate("schema", 42)).to.be.false;
        expect(ajv.validate("schema", 0.42)).to.be.false;
        expect(ajv.validate("schema", "string")).to.be.false;
    });

    it("Should not accept duplicated elements if uniqueItems is specified", () => {
        const schema = schelp.tuple(schelp.string(), schelp.string()).unique();
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", ["a", "b"])).to.be.true;
        expect(ajv.validate("schema", ["a", "a"])).to.be.false;
    });
});
