import { it, expect, describe, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TopNavigationBar } from './TopNavigationBar';
import { AuthContext } from "../../../context/auth/AuthContext";

const WrappedTopNavigationBarComponen = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <AuthContext.Provider value={{ token: "test", setToken: vi.fn(), isAuthenticated: isAuthenticated }}>  
    <BrowserRouter>
      <TopNavigationBar />
    </BrowserRouter>
  </AuthContext.Provider>
);

describe('TopNavigationBar', () => {
  it('should render the TopNavigationBar component when authenticated', () => {
    render(<WrappedTopNavigationBarComponen isAuthenticated={true} />);

    expect(screen.getByText('Wormhole')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Navigate')).toBeInTheDocument();

    expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Navigate').closest('a')).toHaveAttribute('href', '/navigate');
  });

  it('should render the TopNavigationBar component when unauthenticated', () => {
    render(<WrappedTopNavigationBarComponen isAuthenticated={false} />);

    expect(screen.getByText('Wormhole')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigate')).not.toBeInTheDocument();

    expect(screen.getByText('Wormhole').closest('a')).toHaveAttribute('href', '/');
  });
});