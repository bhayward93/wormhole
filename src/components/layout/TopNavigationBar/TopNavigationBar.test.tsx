import { it, expect, describe, vi } from "vitest";
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TopNavigationBar } from './TopNavigationBar';
import { AuthContext } from "../../../context/auth/AuthContext";
import { AuthContextType } from "../../../types/auth-types";

const WrappedTopNavigationBarComponent = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <AuthContext.Provider value={{ isAuthenticated: isAuthenticated } as AuthContextType}>  
    <BrowserRouter>
      <TopNavigationBar />
    </BrowserRouter>
  </AuthContext.Provider>
);

describe('TopNavigationBar', () => {
  describe('authenticated', () => {
    it('should render the TopNavigationBar component when authenticated', () => {
      render(<WrappedTopNavigationBarComponent isAuthenticated={true} />);

      expect(screen.getByText('Wormhole')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Navigate')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    
      expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute('href', '/');
      expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
      expect(screen.getByText('Navigate').closest('a')).toHaveAttribute('href', '/navigate');
    });

    it('should call the logout function when the Logout button is clicked', () => {
      const logoutFnMock = vi.fn();
      vi.mock('../../../hooks/session-utils/use-session-utils', () => ({
        logout: logoutFnMock
      }));
      render(<WrappedTopNavigationBarComponent isAuthenticated={true} />);
      fireEvent.click(screen.getByText('Logout'));
      expect(logoutFnMock).toHaveBeenCalled();
    });
  });

  describe('unauthenticated', () => {
    it('should render the TopNavigationBar component when unauthenticated', () => {
      render(<WrappedTopNavigationBarComponent isAuthenticated={false} />);

      expect(screen.getByText('Wormhole')).toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Navigate')).not.toBeInTheDocument();

      expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute('href', '/');
    });
  });
});