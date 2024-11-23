import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthPage } from './pages/AuthPage/AuthPage';
import { AuthProvider } from './context/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <AuthPage/>
      },
      {
        path: 'dashboard',
        element: <div>Dashboard</div>
      },
      {
        path: 'navigate',
        element: <div>Todo</div>
      }
    ]
  },
])

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
