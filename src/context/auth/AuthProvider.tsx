import { PropsWithChildren, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useLocalStorage } from "../../hooks/local-storage/useLocalStorage";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../consts/local-storage-keys/local-storage-keys";

/** Auth provider props. */
export type AuthProviderProps = PropsWithChildren;

/**
 * Auth provider.
 * @param { AuthProviderProps } props - props.
 * @returns { JSX.Element } Auth provider.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
		const { value: token, setItem: setToken } = useLocalStorage<string|null>(
			LOCAL_STORAGE_AUTH_TOKEN_KEY,
			null
		);
	
		useEffect(() => {
			if (token) {
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			} else {
				delete axios.defaults.headers.common.Authorization;
			}
		}, [token]);

    return (
        <AuthContext.Provider value={{token, setToken, isAuthenticated: Boolean(token)}}>
            { children }
        </AuthContext.Provider>
    );
}