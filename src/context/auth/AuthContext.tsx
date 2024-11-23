import { createContext } from "react";
import { AuthContextType } from "../../types/authTypes";

/** Auth context. */
export const AuthContext = createContext<AuthContextType>({
    token: '',
    setToken: () => void 0,
});