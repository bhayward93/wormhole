import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import { useContext } from "react";
import { useSessionUtils } from "../../../hooks/session-utils/use-session-utils";

/**
 * Top navigation bar component.
 * @returns { JSX.Element } The top navigation bar component.
 */
export function TopNavigationBar(): JSX.Element {
    const { isAuthenticated } = useContext(AuthContext);
    const { logout } = useSessionUtils();

    return (
        <nav className={`fixed top-0 w-full flex bg-background flex-row gap-8 sm:gap-16 h-[50px] px-8 sm:px-16 py-2 border-b border-border`}>
            <NavLink to="/" className="flex items-center">
                <h1 className="text-2xl font-bold">Wormhole</h1>
            </NavLink>
            { isAuthenticated && (
                <ul className="flex flex-row w-full items-center gap-4">
                    <li>
                        <NavLink to="/dashboard" className="group">
                            <span className="group-[.active]:underline hover:underline">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/navigate" className="group">
                            <span className="group-[.active]:underline hover:underline">Navigate</span>
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={logout} className="cursor-pointer hover:underline">Logout</span>
                    </li>
                </ul>
            )}
        </nav>
    );
}