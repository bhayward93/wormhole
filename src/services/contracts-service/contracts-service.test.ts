import { it, expect, describe, vi, MockedFunction } from "vitest";
import { getMyContracts } from "./contracts-service";
import axios from "axios";

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getMyContracts", () => {
  it("should fetch contracts successfully", async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { mockResponse: true } });

    const result = await getMyContracts();

    expect(result).toEqual({ mockResponse: true });
    expect(axios.get).toHaveBeenCalledWith('https://api.spacetraders.io/v2/my/contracts');
  });

  it("should throw an error when fetching contracts fails", async () => {
    const errorMessage = "Error message";
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    await expect(getMyContracts()).rejects.toThrow(errorMessage);
  });
});
