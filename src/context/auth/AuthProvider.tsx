import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export type AuthProviderProps = PropsWithChildren;

/**
 * Auth provider.
 * @param { AuthProviderProps } props - props.
 * @returns { JSX.Element } Auth provider.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const interceptor = axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}