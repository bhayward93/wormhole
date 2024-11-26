import { it, expect, describe, vi, MockedFunction } from 'vitest';
import { acceptContract, getMyContracts } from './contracts-service';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isAxiosError: vi.fn(() => true),
  },
}));

describe('getMyContracts', () => {
  it('should fetch contracts successfully', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { mockResponse: true },
    });

    const result = await getMyContracts();

    expect(result).toEqual({ mockResponse: true });
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/my/contracts'
    );
  });

  it('should throw an error when fetching contracts fails', async () => {
    const errorMessage = 'Error message';
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    await expect(getMyContracts()).rejects.toThrow(errorMessage);
  });
});

describe('acceptContract', () => {
  it('should accept a contract successfully', async () => {
    (axios.post as MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: { mockResponse: true },
    });

    const result = await acceptContract('123');

    expect(result).toEqual({ mockResponse: true });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/my/contracts/123/accept'
    );
  });

  it('should throw an error when accepting a contract fails', async () => {
    const errorMessage = 'Error message';
    (axios.post as MockedFunction<typeof axios.post>).mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    await expect(acceptContract('123')).rejects.toThrow(errorMessage);
  });
});
