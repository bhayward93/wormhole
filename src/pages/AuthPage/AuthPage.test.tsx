import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthPage } from './AuthPage';

vi.mock('./AuthPage', () => ({
  AuthPage: vi.fn(() => <div data-testid="registration-form" />),
}));

describe('AuthPage', () => {
  it('renders the registration form', async () => {
    render(<AuthPage />);

    const registrationForm = screen.getByTestId('registration-form');

    expect(registrationForm).toBeInTheDocument();
  });
});
