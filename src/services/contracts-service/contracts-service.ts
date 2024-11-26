import { Contract } from '../../types/game-types';
import axios from 'axios';

/** The response from the call to get the agents contracts. */
export type GetMyContractsResponse = {
  data: Contract[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

/**
 * Call to fetch the logged in user's contracts.
 * @returns { Promise<GetMyContractsResponse> } The contracts response.
 */
export const getMyContracts = async (): Promise<GetMyContractsResponse> => {
  try {
    const resp = await axios.get('https://api.spacetraders.io/v2/my/contracts');
    return resp.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.error?.message ?? 'An error occurred');
    }
    throw new Error('An error occurred');
  }
};

/** The response from the call to get a contract. */
export type GetContractResponse = { data: { contract: Contract } };

/**
 * Call to accept a contract.
 * @param { string } contractId - The contract ID.
 * @returns { Promise<GetContractResponse> }
 */
export const acceptContract = async (
  contractId: string
): Promise<GetContractResponse> => {
  try {
    const resp = await axios.post(
      `https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`
    );
    return resp.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.error?.message ?? 'An error occurred');
    }
    throw new Error('An error occurred');
  }
};
