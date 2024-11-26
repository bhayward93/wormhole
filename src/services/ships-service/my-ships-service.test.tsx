import { it, expect, describe, vi, MockedFunction } from "vitest";
import { getMyShips } from "./my-ships-service";
import axios from "axios";

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getMyShips", () => {
  it("should fetch ships successfully", async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { mockResponse: true } });

    const result = await getMyShips();

    expect(result).toEqual({ mockResponse: true });
    expect(axios.get).toHaveBeenCalledWith('https://api.spacetraders.io/v2/my/ships');
  });

  it("should throw an error when fetching contracts fails", async () => {
    const errorMessage = "Error message";
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    await expect(getMyShips()).rejects.toThrow(errorMessage);
  });
});
