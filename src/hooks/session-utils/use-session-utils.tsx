import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Session hook type. */
type UseSessionReturnType = {
    logout: () => void;
};

/**
 * Session utilities hook.
 * @returns { UseSessionReturnType }
 */
export const useSessionUtils = (): UseSessionReturnType => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        navigate("/");
    };

    return { logout };
};