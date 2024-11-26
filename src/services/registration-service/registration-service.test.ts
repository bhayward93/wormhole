import { it, expect, describe, vi, MockedFunction } from 'vitest';
import { register, RegisterParams } from './registration-service';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn(() => true),
  },
}));

describe('register', () => {
  const mockRegisterParams: RegisterParams = {
    symbol: 'testSymbol',
    faction: 'testFaction',
  };

  it('should register successfully', async () => {
    (axios.post as MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: { mockResponse: true },
    });

    const result = await register({
      symbol: 'testSymbol',
      faction: 'testFaction',
    });

    expect(result).toEqual({ mockResponse: true });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/register',
      {
        symbol: mockRegisterParams.symbol,
        faction: mockRegisterParams.faction,
      }
    );
  });

  it('should throw an error when registration fails', async () => {
    const errorMessage = 'Error message';
    (axios.post as MockedFunction<typeof axios.post>).mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    await expect(
      register({
        symbol: 'testSymbol',
        faction: 'testFaction',
      })
    ).rejects.toThrow(errorMessage);
  });
});
