import { RegisterResponse } from "../types/gameTypes";

/** Params for the register request. */
export type RegisterParams = {
    symbol: string;
    faction: string;
}

/**
 * Call to register a user.
 * @param { RegisterParams } params - The parameters for the register request.
 * @returns { Promise<RegisterResponse> } The register response.
 */
export const register = async ({ symbol, faction }: RegisterParams): Promise<RegisterResponse> => {
    const resp = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            symbol: symbol,
            faction: faction,
        }),
    });

    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data?.error?.message ?? 'An error occurred');
    }

    return data;
}
