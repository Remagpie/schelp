import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("Number", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.number();
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
        const minimum = schelp.number().min(42);
        expect(ajv.validateSchema(minimum.toSchema("schema"))).to.be.true;
        const exclusiveMinimum = schelp.number().min(42, true);
        expect(ajv.validateSchema(exclusiveMinimum.toSchema("schema"))).to.be
            .true;
        const maximum = schelp.number().max(42);
        expect(ajv.validateSchema(maximum.toSchema("schema"))).to.be.true;
        const exclusiveMaximum = schelp.number().max(42, true);
        expect(ajv.validateSchema(exclusiveMaximum.toSchema("schema"))).to.be
            .true;
        const multipleOf = schelp.number().multipleOf(42);
        expect(ajv.validateSchema(multipleOf.toSchema("schema"))).to.be.true;
    });

    it("Should accept only numberic values", () => {
        const schema = schelp.number();
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", [])).to.be.false;
        expect(ajv.validate("schema", 42)).to.be.true;
        expect(ajv.validate("schema", 0.42)).to.be.true;
        expect(ajv.validate("schema", "string")).to.be.false;
    });

    it("Should accept only numbers greater than the minimum", () => {
        const inclusive = schelp.number().min(42);
        ajv.addSchema(inclusive.toSchema("inclusive"));
        expect(ajv.validate("inclusive", 0)).to.be.false;
        expect(ajv.validate("inclusive", 42)).to.be.true;
        expect(ajv.validate("inclusive", 43)).to.be.true;

        const exclusive = schelp.number().min(42, true);
        ajv.addSchema(exclusive.toSchema("exclusive"));
        expect(ajv.validate("exclusive", 0)).to.be.false;
        expect(ajv.validate("exclusive", 42)).to.be.false;
        expect(ajv.validate("exclusive", 43)).to.be.true;
    });

    it("Should accept only numbers less than the minimum", () => {
        const inclusive = schelp.number().max(42);
        ajv.addSchema(inclusive.toSchema("inclusive"));
        expect(ajv.validate("inclusive", 0)).to.be.true;
        expect(ajv.validate("inclusive", 42)).to.be.true;
        expect(ajv.validate("inclusive", 43)).to.be.false;

        const exclusive = schelp.number().max(42, true);
        ajv.addSchema(exclusive.toSchema("exclusive"));
        expect(ajv.validate("exclusive", 0)).to.be.true;
        expect(ajv.validate("exclusive", 42)).to.be.false;
        expect(ajv.validate("exclusive", 43)).to.be.false;
    });

    it("Should accept only multiples of the base value if multipleOf is specified", () => {
        const schema = schelp.number().multipleOf(42);
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", 0)).to.be.true;
        expect(ajv.validate("schema", 42)).to.be.true;
        expect(ajv.validate("schema", 43)).to.be.false;
        expect(ajv.validate("schema", 84)).to.be.true;
    });
});
