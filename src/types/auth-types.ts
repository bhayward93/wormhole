/** Auth context type. */
export type AuthContextType = {
    token: string|null;
    isAuthenticated: boolean;
    setToken: (value: string|null) => void;
}