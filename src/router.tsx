import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { UnauthenticatedOnlyRoute } from "./components/routing/unauthenticated-only-route/unauthenticated-only-route";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { AuthenticatedOnlyRoute } from "./components/routing/autheticated-only-route/authenticated-only-route";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";

/**
 * Router for the application.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: (
          <UnauthenticatedOnlyRoute>
            <AuthPage/>
          </UnauthenticatedOnlyRoute>
        )
      },
      {
        path: 'dashboard',
        element: (
          <AuthenticatedOnlyRoute>
            <DashboardPage/>
          </AuthenticatedOnlyRoute>
        )
      },
      {
        path: 'navigate',
        element: (
          <AuthenticatedOnlyRoute>
            <div>Todo</div>
          </AuthenticatedOnlyRoute>
        )
      }
    ]
  },
])
