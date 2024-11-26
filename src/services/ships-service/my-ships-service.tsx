import { Ship } from "../../types/game-types";
import axios from "axios";

/** The response from the call to get the logged in user's ships. */
export type GetMyShipsResponse = {
    data: Ship[];
    meta: {
      total: number;
      page: number;
      limit: number;
    };
  };

/**
 * Calls to get the logged in user's ships.
 * @returns { Promise<GetMyShipsResponse> } The get my ships response.
 */
export const getMyShips = async (): Promise<GetMyShipsResponse> => {
  try {
    const resp = await axios.get("https://api.spacetraders.io/v2/my/ships");
    return resp.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message ?? 'An error occurred');
  }
};