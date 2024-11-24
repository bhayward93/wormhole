import { it, expect, describe } from "vitest";
import { act, render, screen } from '@testing-library/react';
import { ContractSummaryTable } from './ContractSummaryTable';
import { GameStateContext } from '../../../context/game-state/GameStateContext';
import { Contract } from '../../../types/game-types';

describe('ContractSummaryTable', () => {
  it('should render the table headers', () => {
    render(
      <GameStateContext.Provider value={{ contracts: [] } as any}>
        <ContractSummaryTable />
      </GameStateContext.Provider>
    );

    expect(screen.getByText('Your Contracts')).toBeInTheDocument();
  });

  it('should render contract data', async () => {
    const mockContracts: Contract[] = [
      {
        id: 'contract1',
        factionSymbol: 'faction1',
        terms: { deliver: [{ destinationSymbol: 'destination1' }] },
        expiration: 'expiration1',
        fulfilled: false,
        accepted: false,
        deadlineToAccept: 'deadline1',
      } as Contract,
      {
        id: 'contract2',
        factionSymbol: 'faction2',
        terms: { deliver: [{ destinationSymbol: 'destination2' }] },
        expiration: 'expiration2',
        fulfilled: true,
        accepted: true,
        deadlineToAccept: 'deadline2',
      } as Contract,
    ];

    render(
      <GameStateContext.Provider value={{ contracts: mockContracts } as any}>
        <ContractSummaryTable />
      </GameStateContext.Provider>
    );

    expect(screen.getByText('contract1')).toBeInTheDocument();

    await act(async () => {
      screen.getByTestId('contract-accordion-trigger-contract1').click();
    });

    expect(screen.getByText('faction1')).toBeInTheDocument();
    expect(screen.getByText('destination1')).toBeInTheDocument();
    expect(screen.getByText('expiration1')).toBeInTheDocument();
    expect(screen.getByText('Unfulfilled')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('deadline1')).toBeInTheDocument();

    expect(screen.getByText('contract2')).toBeInTheDocument();

    await act(async () => {
      screen.getByTestId('contract-accordion-trigger-contract2').click();
    });

    expect(screen.getByText('faction2')).toBeInTheDocument();
    expect(screen.getByText('destination2')).toBeInTheDocument();
    expect(screen.getByText('expiration2')).toBeInTheDocument();
    expect(screen.getByText('Fulfilled')).toBeInTheDocument();
    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.getByText('deadline2')).toBeInTheDocument();
  });
});
