import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenAlert } from './TokenAlert';

describe('TokenAlert', () => {
  it('should render the TokenAlert component with token', () => {
    const token = "token";
    const onContinue = vi.fn();

    render(<TokenAlert token={token} onContinue={onContinue} />);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Please save your access token')).toBeInTheDocument();
    expect(screen.getByText(token)).toBeInTheDocument();
  });

  it('should call onContinue when continue button is clicked', () => {
    const token = "token";
    const onContinue = vi.fn();

    render(<TokenAlert token={token} onContinue={onContinue} />);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(onContinue).toHaveBeenCalled();
  });
});
