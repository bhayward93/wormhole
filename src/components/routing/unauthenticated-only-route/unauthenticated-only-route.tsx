import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../../consts/local-storage-keys/local-storage-keys";

/**
 * Route that only allows access to unauthenticated users (e.g. login / register forms).
 * @param { JSX.Element } children - The children to render.
 * @returns { JSX.Element }
 */
export function UnauthenticatedOnlyRoute({ children }: { children: JSX.Element }): JSX.Element {
  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}