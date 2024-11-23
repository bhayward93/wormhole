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
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Navigate')).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(
      <BrowserRouter>
        <TopNavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Navigate').closest('a')).toHaveAttribute('href', '/navigate');
  });
});
