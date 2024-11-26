import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TopNavigationBar } from './TopNavigationBar';
import { AuthContext } from '../../../context/auth/AuthContext';
import { AuthContextType } from '../../../types/auth-types';
import { PropsWithChildren } from 'react';

const mockLogout = vi.fn();

// Mock the entire module before any test code
vi.mock('../../../hooks/session-utils/use-session-utils', () => ({
  useSessionUtils: () => ({
    logout: mockLogout,
  }),
}));

const Wrapper = ({
  isAuthenticated,
  children,
}: PropsWithChildren<{ isAuthenticated: boolean }>) => (
  <AuthContext.Provider
    value={{ isAuthenticated: isAuthenticated } as AuthContextType}
  >
    <BrowserRouter>{children}</BrowserRouter>
  </AuthContext.Provider>
);

describe('TopNavigationBar', () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });

  describe('authenticated', () => {
    it('should render the TopNavigationBar component when authenticated', () => {
      render(
        <Wrapper isAuthenticated={true}>
          <TopNavigationBar />
        </Wrapper>
      );

      expect(screen.getByText('Wormhole')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Navigate')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();

      expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute(
        'href',
        '/'
      );
      expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
        'href',
        '/dashboard'
      );
      expect(screen.getByText('Navigate').closest('a')).toHaveAttribute(
        'href',
        '/navigate'
      );
    });

    it('should call the logout function when the Logout button is clicked', () => {
      render(
        <Wrapper isAuthenticated={true}>
          <TopNavigationBar />
        </Wrapper>
      );
      fireEvent.click(screen.getByText('Logout'));
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('unauthenticated', () => {
    it('should render the TopNavigationBar component when unauthenticated', () => {
      render(
        <Wrapper isAuthenticated={false}>
          <TopNavigationBar />
        </Wrapper>
      );

      expect(screen.getByText('Wormhole')).toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Navigate')).not.toBeInTheDocument();

      expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute(
        'href',
        '/'
      );
    });
  });
});
