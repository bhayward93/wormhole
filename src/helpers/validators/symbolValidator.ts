export function validateSymbol(value: string): boolean {
    if (value.length < 3) {
      throw new Error("Symbol must be at least 3 characters long");
    }

    if (value.length > 14) {
      throw new Error("Symbol must be less than 14 characters long");
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      throw new Error("Symbol can only contain alphanumeric characters, dashes, and underscores");
    }

    return true;
}