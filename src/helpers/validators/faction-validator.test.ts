import { describe, it, expect } from "vitest";
import { validateFaction } from "./faction-validator";
import { FactionNameEnum } from "../../types/faction-enum";

describe("validateFaction", () => {
    it("should return true for a valid faction", () => {
        expect(validateFaction(FactionNameEnum.AEGIS)).toBe(true);
    });

    it("should return true for a valid faction in lower case", () => {
        expect(validateFaction(FactionNameEnum.AEGIS.toLowerCase())).toBe(true);
    });

    it("should throw an error for an invalid faction", () => {
        expect(() => validateFaction("invalid")).toThrow("Invalid faction");
    });
});