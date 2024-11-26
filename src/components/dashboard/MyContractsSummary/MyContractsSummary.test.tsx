import { it, expect, describe, vi } from "vitest";
import { act, render, screen } from '@testing-library/react';
import { MyContractsSummary } from './MyContractsSummary';
import { GameStateContext, GameStateContextType } from '../../../context/game-state/GameStateContext';
import { Contract } from '../../../types/game-types';
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

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

describe('ContractSummaryTable', () => {
  it('should render the table headers', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{ contracts: [] } as any}>
          <MyContractsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText('Your Contracts')).toBeInTheDocument();
  });

  it('should render contract data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{ contracts: mockContracts } as any}>
          <MyContractsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
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

  it("calls to refetch and render data if data is not present", async () => {
    vi.mock('axios', () => ({
      default: {
        get: vi.fn(() => ({ data: { data: null } }))
      }
    }));
    
    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{
          contracts: [],
          setContracts: vi.fn(),
          ships: [],
          faction: null,
          agent: null,
          setShips: vi.fn(),
          setFaction: vi.fn(),
          setAgent: vi.fn(),
          initGameState: vi.fn()
        }}>
          <MyContractsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
    );

    expect(axios.get).toHaveBeenCalledWith('https://api.spacetraders.io/v2/my/contracts');
  });
});
