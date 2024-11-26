import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render the LoadingSpinner component with default size', () => {
    render(<LoadingSpinner />);

    const loader = screen.getByTestId('loading-spinner');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('animate-spin text-primary');
  });

  it('should render the LoadingSpinner component with custom size and className', () => {
    render(<LoadingSpinner size={48} className="custom-class" />);

    const loader = screen.getByTestId('loading-spinner');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('animate-spin text-primary custom-class');
  });
});
