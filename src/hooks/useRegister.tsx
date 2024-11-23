import { useState, useCallback } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from "react";

/**
 * Register hook - allows a user to register for a token.
 */
export function useRegister() {
  const { setToken } = useContext(AuthContext);
  const [ data, setData ] = useState("");
  const [ inProgress, setInProgress ] = useState(false);
  const [ error, setError ] = useState("");

  /**
   * Register a user.
   * @param { string } symbol - The symbol of the user.
   * @param { string } faction - The faction of the user.
   * @returns { Promise<void> } void.
   */
  const register = useCallback(async (symbol: string, faction: string): Promise<void> => {
    setInProgress(true);
    setError("");

    try {
      const resp = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol,
          faction: faction,
        }),
      });

      const json = await resp.json();

      if (resp.ok) {
        setToken(json.data.token);
      } else {
        setError(json.error.message || "An error occurred");
      }

      setData(JSON.stringify(json, null, 2));
    } catch (err) {
      setError("Network error");
    } finally {
      setInProgress(false);
    }
  }, [setToken, setData]);

  return {
    register,
    data,
    inProgress,
    error
  };
}
