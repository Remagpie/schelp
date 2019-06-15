import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("String", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.string();
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
        const pattern = schelp.string(/\d+\.[d-w]?/);
        expect(ajv.validateSchema(pattern.toSchema("schema"))).to.be.true;
        const minLength = schelp.string().min(42);
        expect(ajv.validateSchema(minLength.toSchema("schema"))).to.be.true;
        const maxLength = schelp.string().max(42);
        expect(ajv.validateSchema(maxLength.toSchema("schema"))).to.be.true;
    });

    it("Should accept only string values", () => {
        const schema = schelp.string();
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
        const schema = schelp.string(/\d+\.[d-w]?/);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "string")).to.be.false;
        expect(ajv.validate("schema", "42.d")).to.be.true;
        expect(ajv.validate("schema", "4242.")).to.be.true;
    });

    it("Should not accept long string if maxLength is specified", () => {
        const schema = schelp.string().max(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "a".repeat(41))).to.be.true;
        expect(ajv.validate("schema", "a".repeat(43))).to.be.false;
    });

    it("Should not accept short string if minLength is specified", () => {
        const schema = schelp.string().min(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", "a".repeat(41))).to.be.false;
        expect(ajv.validate("schema", "a".repeat(43))).to.be.true;
    });
});
