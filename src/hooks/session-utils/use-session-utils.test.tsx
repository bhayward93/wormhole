import { useSessionUtils } from "./use-session-utils";
import { AuthContext } from "../../context/auth/AuthContext";
import { GameStateContext } from "../../context/game-state/GameStateContext";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

describe("useSessionUtils", () => {
  const setToken = vi.fn();
  const initGameState = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={{ setToken, token: null, isAuthenticated: false }}>
      <GameStateContext.Provider value={{ initGameState, ships: [], contracts: [], faction: null, agent: null, setShips: vi.fn(), setContracts: vi.fn(), setFaction: vi.fn(), setAgent: vi.fn() }}>
        <MemoryRouter>{children}</MemoryRouter>
      </GameStateContext.Provider>
    </AuthContext.Provider>
  );

  it("should logout correctly", () => {
    const { result } = renderHook(() => useSessionUtils(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(initGameState).toHaveBeenCalledWith({
      ships: [],
      contracts: [],
      faction: null,
      agent: null,
    });
    expect(setToken).toHaveBeenCalledWith(null);
    expect(window.location.pathname).toBe("/");
  });
});
