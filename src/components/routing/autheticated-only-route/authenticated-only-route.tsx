import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../../consts/local-storage-keys/local-storage-keys";

/**
 * Route that only allows access to authenticated users.
 * @param { JSX.Element } children - The children to render.
 * @returns { JSX.Element }
 */
export function AuthenticatedOnlyRoute({ children }: { children: JSX.Element }): JSX.Element {
  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
  return isAuthenticated ? children : <Navigate to="/" />;
}