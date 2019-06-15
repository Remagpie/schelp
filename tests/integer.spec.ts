import * as Ajv from "ajv";
import { expect } from "chai";

import * as schelp from "../src/index";

describe("Integer", () => {
    let ajv: Ajv.Ajv;

    beforeEach(() => {
        ajv = Ajv();
    });

    it("Should generate a valid schema", () => {
        const basic = schelp.integer();
        expect(ajv.validateSchema(basic.toSchema("schema"))).to.be.true;
    });

    it("Should accept only integer values", () => {
        const schema = schelp.integer();
        ajv.addSchema(schema.toSchema("schema"));
        expect(ajv.validate("schema", null)).to.be.false;
        expect(ajv.validate("schema", true)).to.be.false;
        expect(ajv.validate("schema", {})).to.be.false;
        expect(ajv.validate("schema", [])).to.be.false;
        expect(ajv.validate("schema", 42)).to.be.true;
        expect(ajv.validate("schema", 0.42)).to.be.false;
        expect(ajv.validate("schema", "string")).to.be.false;
    });
});
