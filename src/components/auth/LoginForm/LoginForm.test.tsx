import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { FactionNameEnum } from "../../../types/factionEnum";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../hooks/useRegister", () => ({
  useRegister: vi.fn(() => ({
    register: vi.fn(),
    inProgress: false,
    error: null,
  })),
}));

describe('LoginForm', () => {
  it('should render', () => {
    render(<LoginForm />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  describe('Input validation', () => {
    it('should validate symbol input', () => { 
      render(<LoginForm />);

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      fireEvent.change(symbolInput, { target: { value: 'ab' } });
      fireEvent.blur(symbolInput);
    
      expect(screen.getByText('Symbol must be at least 3 characters long')).toBeInTheDocument();
    });

    it('should validate faction input', () => {
      render(<LoginForm />);

      const factionInput = screen.getByTestId('text-form-group-input-faction');

      fireEvent.change(factionInput, { target: { value: 'InvalidFaction' } });
      fireEvent.blur(factionInput);

      expect(screen.getByText('Invalid faction')).toBeInTheDocument();
    });
  });

  describe('Register', () => {
    it('should enable register button when form is valid', () => {
      render(<LoginForm />);

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      const factionInput = screen.getByTestId('text-form-group-input-faction');

      fireEvent.change(symbolInput, { target: { value: 'ValidSymbol' } });
      fireEvent.change(factionInput, { target: { value: FactionNameEnum.ANCIENTS } });

      expect(screen.getByTestId('register-button')).not.toBeDisabled();
    });

    it('should display error message when registration hook has an error', () => {
      vi.mock("../../../hooks/useRegister", () => ({
        useRegister: vi.fn(() => ({
          register: vi.fn(),
          inProgress: false,
          error: 'Error message',
        })),
      }));

      render(<LoginForm />);

      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });
});
