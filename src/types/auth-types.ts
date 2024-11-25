/** Auth context type. */
export type AuthContextType = {
    token: string|null;
    setToken: (value: string|null) => void;
}