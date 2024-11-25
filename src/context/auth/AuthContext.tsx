import { createContext } from "react";
import { AuthContextType } from "../../types/auth-types";

/** Auth context. */
export const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    setToken: (value: string|null) => void 0,
});