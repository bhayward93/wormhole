import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

export type AuthProviderProps = PropsWithChildren;

/**
 * Auth provider.
 * @param { AuthProviderProps } props - props.
 * @returns { JSX.Element } Auth provider.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [token, setToken] = useState<string>('')

    return (
        <AuthContext.Provider value={{token, setToken}}>
            { children }
        </AuthContext.Provider>
    );
}