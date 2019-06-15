import * as Ajv from "ajv";
import { expect } from "chai";

import StringSchema from "../src/string";

describe("String", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = new StringSchema();
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
        const pattern = new StringSchema(/\d+\.[d-w]?/);
        expect(ajv.validateSchema(pattern.toSchema("schema"))).to.be.true;
        const minLength = new StringSchema().min(42);
        expect(ajv.validateSchema(minLength.toSchema("schema"))).to.be.true;
        const maxLength = new StringSchema().max(42);
        expect(ajv.validateSchema(maxLength.toSchema("schema"))).to.be.true;
    });

    it("Should accept only string values", () => {
        const schema = new StringSchema();
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", [])).to.be.false;
        expect(ajv.validate("schema", 42)).to.be.false;
        expect(ajv.validate("schema", 0.42)).to.be.false;
        expect(ajv.validate("schema", "string")).to.be.true;
    });

    it("Should accept only matching string if pattern is specified", () => {
        const schema = new StringSchema(/\d+\.[d-w]?/);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "string")).to.be.false;
        expect(ajv.validate("schema", "42.d")).to.be.true;
        expect(ajv.validate("schema", "4242.")).to.be.true;
    });

    it("Should not accept long string if maxLength is specified", () => {
        const schema = new StringSchema().max(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "a".repeat(41))).to.be.true;
        expect(ajv.validate("schema", "a".repeat(43))).to.be.false;
    });

    it("Should not accept short string if minLength is specified", () => {
        const schema = new StringSchema().min(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "a".repeat(41))).to.be.false;
        expect(ajv.validate("schema", "a".repeat(43))).to.be.true;
    });
});
