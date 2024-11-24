import { describe, it, expect } from "vitest";
import { validateSymbol } from "./symbol-validator";

describe("validateSymbol", () => {
    it("should return true for a valid symbol", () => {
        expect(validateSymbol("validSymbol")).toBe(true);
    });

    it("should throw an error for a symbol that is too short", () => {
        expect(() => validateSymbol("ab")).toThrow("Symbol must be at least 3 characters long");
    });

    it("should throw an error for a symbol that is too long", () => {
        expect(() => validateSymbol("thisSymbolIsWayTooLong")).toThrow("Symbol must be less than 14 characters long");
    });

    it("should throw an error for a symbol with invalid characters", () => {
        expect(() => validateSymbol("invalid!@#")).toThrow("Symbol can only contain alphanumeric characters, dashes, and underscores");
    });
});
