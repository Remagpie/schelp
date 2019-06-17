import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("Array", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.array(schelp.number());
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
        const minItems = schelp.array(schelp.number()).min(42);
        expect(ajv.validateSchema(minItems.toSchema("schema"))).to.be.true;
        const maxItems = schelp.array(schelp.number()).max(42);
        expect(ajv.validateSchema(maxItems.toSchema("schema"))).to.be.true;
        const uniqueItems = schelp.array(schelp.number()).unique();
        expect(ajv.validateSchema(uniqueItems.toSchema("schema"))).to.be.true;
    });

    it("Should accept only array values", () => {
        const schema = schelp.array(schelp.number());
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", [])).to.be.true;
        expect(ajv.validate("schema", [42])).to.be.true;
        expect(ajv.validate("schema", 42)).to.be.false;
        expect(ajv.validate("schema", 0.42)).to.be.false;
        expect(ajv.validate("schema", "string")).to.be.false;
    });

    it("Should not accept short array if minItems is specified", () => {
        const schema = schelp.array(schelp.number()).min(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", Array(41).fill(42))).to.be.false;
        expect(ajv.validate("schema", Array(42).fill(42))).to.be.true;
        expect(ajv.validate("schema", Array(43).fill(42))).to.be.true;
    });

    it("Should not accept long array if maxItems is specified", () => {
        const schema = schelp.array(schelp.number()).max(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", Array(41).fill(42))).to.be.true;
        expect(ajv.validate("schema", Array(42).fill(42))).to.be.true;
        expect(ajv.validate("schema", Array(43).fill(42))).to.be.false;
    });

    it("Should not accept duplicated elements if uniqueItems is specified", () => {
        const schema = schelp.array(schelp.number()).unique();
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", [42])).to.be.true;
        expect(ajv.validate("schema", [41, 42, 43])).to.be.true;
        expect(ajv.validate("schema", [42, 42, 42])).to.be.false;
    });
});
