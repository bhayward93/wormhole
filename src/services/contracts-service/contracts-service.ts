import { Contract } from "../../types/game-types";
import axios from "axios";

/** The response from the call to get the agents contracts. */
export type ContractsResponse = {
  data: Contract[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

/**
 * Call to fetch the logged in user's contracts.
 * @returns { Promise<ContractsResponse> } The contracts response.
 */
export const getMyContracts = async (): Promise<ContractsResponse> => {
  try {
    const resp = await axios.get('https://api.spacetraders.io/v2/my/contracts');
    return resp.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message ?? 'An error occurred');
  }
};
