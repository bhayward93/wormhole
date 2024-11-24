import { it, expect, describe } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TopNavigationBar } from './TopNavigationBar';

describe('TopNavigationBar', () => {
  it('should render the TopNavigationBar component', () => {
    render(
      <BrowserRouter>
        <TopNavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Wormhole')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Navigate')).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(
      <BrowserRouter>
        <TopNavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Navigate').closest('a')).toHaveAttribute('href', '/navigate');
  });
});
