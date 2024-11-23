import { Dispatch, SetStateAction } from "react";

/** Auth context type. */
export type AuthContextType = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}