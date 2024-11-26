import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SummaryCardHeader } from './SummaryCardHeader';

describe('SummaryCardHeader', () => {
  it('renders the title', () => {
    render(<SummaryCardHeader title="Title" onRefresh={() => void 0} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('calls onRefresh when refresh icon is clicked', () => {
    const onRefreshMock = vi.fn();
    render(<SummaryCardHeader title="Title" onRefresh={onRefreshMock} />);
    fireEvent.click(screen.getByTestId('summary-card-refresh-icon'));
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
  });
});
