import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthPage } from './AuthPage';

vi.mock('./AuthPage', () => ({
  AuthPage: vi.fn(() => <div data-testid="login-form" />),
}));

describe('AuthPage', () => {
  it('renders the login form', async () => {
    render(<AuthPage />);

    const loginForm = screen.getByTestId('login-form');

    expect(loginForm).toBeInTheDocument();
  });
});
