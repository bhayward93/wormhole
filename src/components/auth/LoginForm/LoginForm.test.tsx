import { it, expect, describe, vi, MockedFunction } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FactionNameEnum } from '../../../types/faction-enum';
import axios from 'axios';

const queryClient = new QueryClient();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn(() => true),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('LoginForm', () => {
  it('should render', () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  describe('Input validation', () => {
    it('should validate symbol input', () => {
      render(
        <Wrapper>
          <LoginForm />
        </Wrapper>
      );

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      fireEvent.change(symbolInput, { target: { value: 'ab' } });
      fireEvent.blur(symbolInput);

      expect(
        screen.getByText('Symbol must be at least 3 characters long')
      ).toBeInTheDocument();
    });

    it('should validate faction input', () => {
      render(
        <Wrapper>
          <LoginForm />
        </Wrapper>
      );

      const factionInput = screen.getByTestId('text-form-group-input-faction');

      fireEvent.change(factionInput, {
        target: { value: 'InvalidFaction' },
      });
      fireEvent.blur(factionInput);

      expect(screen.getByText('Invalid faction')).toBeInTheDocument();
    });
  });

  describe('Register', () => {
    it('should enable register button when form is valid', () => {
      render(
        <Wrapper>
          <LoginForm />
        </Wrapper>
      );

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      const factionInput = screen.getByTestId('text-form-group-input-faction');

      fireEvent.change(symbolInput, { target: { value: 'ValidSymbol' } });
      fireEvent.change(factionInput, {
        target: { value: FactionNameEnum.ANCIENTS },
      });

      expect(screen.getByTestId('register-button')).not.toBeDisabled();
    });

    it('should call to register the user', async () => {
      (axios.post as MockedFunction<typeof axios.post>).mockResolvedValue({
        status: 200,
        data: {
          data: {
            token: 'mockToken',
          },
        },
      });

      render(
        <Wrapper>
          <LoginForm />
        </Wrapper>
      );

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      const factionInput = screen.getByTestId('text-form-group-input-faction');

      await act(async () => {
        fireEvent.change(symbolInput, {
          target: { value: 'ValidSymbol' },
        });
        fireEvent.change(factionInput, {
          target: { value: FactionNameEnum.ANCIENTS },
        });
        fireEvent.click(screen.getByTestId('register-button'));
      });

      expect(axios.post).toHaveBeenCalled();
      expect(
        screen.queryByTestId('login-form-error-message')
      ).not.toBeInTheDocument();
    });

    it('should display error message when registration hook has an error', async () => {
      (axios.post as MockedFunction<typeof axios.post>).mockRejectedValue({
        status: 500,
        response: {
          data: {
            error: {
              message: 'Error message',
            },
          },
        },
      });

      render(
        <Wrapper>
          <LoginForm />
        </Wrapper>
      );

      const symbolInput = screen.getByTestId('text-form-group-input-symbol');
      const factionInput = screen.getByTestId('text-form-group-input-faction');

      await act(async () => {
        fireEvent.change(symbolInput, {
          target: { value: 'ValidSymbol' },
        });
        fireEvent.change(factionInput, {
          target: { value: FactionNameEnum.ANCIENTS },
        });
        fireEvent.click(screen.getByTestId('register-button'));
      });

      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByTestId('login-form-error-message')).toHaveTextContent(
        'Error message'
      );
    });
  });
});
