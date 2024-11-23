import { describe, it, expect, vi } from "vitest";
import { useRegister } from "./useRegister";
import { AuthContext } from "../context/auth/AuthContext";
import { FactionNameEnum } from "../types/factionEnum";
import { act, renderHook } from "@testing-library/react";

describe("useRegister", () => {
  it("should register a user successfully", async () => {
    vi.stubGlobal('fetch', vi.fn(() => ({
      ok: true,
      json: () => Promise.resolve({ data: { token: "token" } }),
    })));

    const setTokenMock = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={{ setToken: setTokenMock, token: "" }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useRegister(), { wrapper });

    await result.current.register("validSymbol", FactionNameEnum.AEGIS);

    expect(setTokenMock).toHaveBeenCalledWith("token");
    expect(result.current.error).toBe("");
    expect(result.current.inProgress).toBe(false);
  });

  it("should handle registration error", async () => {
    vi.stubGlobal('fetch', vi.fn(() => ({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Registration error" } }),
    })));

    const setTokenMock = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={{ setToken: setTokenMock, token: "" }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.register("validSymbol", FactionNameEnum.AEGIS);
    });

    expect(setTokenMock).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Registration error");
    expect(result.current.inProgress).toBe(false);
  });
});
