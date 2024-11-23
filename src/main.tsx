import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthPage } from './pages/AuthPage/AuthPage';
import { AuthProvider } from './context/auth/AuthProvider';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
