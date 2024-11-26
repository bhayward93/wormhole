import { it, expect, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { AuthContextType } from '../../types/auth-types';

describe('DashboardPage', () => {
  it('renders', async () => {
    render(
      <AuthContext.Provider
        value={{ isAuthenticated: true } as AuthContextType}
      >
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <DashboardPage />
          </QueryClientProvider>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Your Ships')).toBeInTheDocument();
      expect(screen.getByText('Your Contracts')).toBeInTheDocument();
    });
  });
});
