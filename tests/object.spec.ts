import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("Object", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.object({ foo: schelp.number() });
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
    });

    it("Should accept only object values", () => {
        const schema = schelp.object({ foo: schelp.number() });
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", { foo: 42 })).to.be.true;
        expect(ajv.validate("schema", [])).to.be.false;
        expect(ajv.validate("schema", [42])).to.be.false;
        expect(ajv.validate("schema", 42)).to.be.false;
        expect(ajv.validate("schema", 0.42)).to.be.false;
        expect(ajv.validate("schema", "string")).to.be.false;
    });

    it("Should not accept if required fields are missing", () => {
        const schema = schelp.object({ foo: schelp.number() });
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", { foo: 42 })).to.be.true;
    });

    it("Should accept if optional fields are missing", () => {
        const schema = schelp.object({ foo: schelp.number().optional() });
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", {})).to.be.true;
        expect(ajv.validate("schema", { foo: 42 })).to.be.true;
    });

    it("Should not accept if additional fields are provided", () => {
        const schema = schelp.object({ foo: schelp.number() });
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", { foo: 42 })).to.be.true;
        expect(ajv.validate("schema", { foo: 42, bar: 42 })).to.be.false;
    });
});
