import { RouterProvider } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GameStateProvider } from './context/game-state/GameStateProvider.tsx';
import { router } from './router.tsx';

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameStateProvider>
          <RouterProvider router={router}/>
        </GameStateProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
