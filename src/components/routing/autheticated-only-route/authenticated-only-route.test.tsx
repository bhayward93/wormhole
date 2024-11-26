import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AuthenticatedOnlyRoute } from './authenticated-only-route';
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../../../consts/local-storage-keys/local-storage-keys';

describe('AuthenticatedOnlyRoute', () => {
  it('renders route when authenticated', () => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, 'test');
    const { getByText } = render(
      <MemoryRouter>
        <AuthenticatedOnlyRoute>
          <div>Authenticated Content</div>
        </AuthenticatedOnlyRoute>
      </MemoryRouter>
    );
    expect(getByText('Authenticated Content')).toBeInTheDocument();
  });

  it('redirects to root when not authenticated', () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const { queryByText } = render(
      <MemoryRouter>
        <AuthenticatedOnlyRoute>
          <div>Authenticated Content</div>
        </AuthenticatedOnlyRoute>
      </MemoryRouter>
    );
    expect(queryByText('Authenticated Content')).not.toBeInTheDocument();
  });
});
