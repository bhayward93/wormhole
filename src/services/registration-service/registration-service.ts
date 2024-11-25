import { Agent } from "http";
import { Contract, Faction, Ship } from "../../types/game-types";
import axios from "axios";

/** Register response. */
export type RegisterResponse = {
  data: {
    token: string;
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
  };
};

/** Params for the register request. */
export type RegisterParams = {
  symbol: string;
  faction: string;
};

/**
 * Calls to register a new agent.
 * @param { RegisterParams } params - The register parameters.
 * @returns { Promise<RegisterResponse> } The register response.
 */
export const register = async ({ symbol, faction }: RegisterParams): Promise<RegisterResponse> => {
  try {
    const resp = await axios.post("https://api.spacetraders.io/v2/register", {
      symbol: symbol,
      faction: faction,
    });
    return resp.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message ?? 'An error occurred');
  }
};