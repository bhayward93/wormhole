import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContractAcceptButton } from './ContractAcceptButton';
import {
  GameStateContext,
  GameStateContextType,
} from '../../../../../context/game-state/GameStateContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Contract } from '../../../../../types/game-types';
import axios from 'axios';

const queryClient = new QueryClient();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockGameStateContext: GameStateContextType = {
  contracts: [],
  setContracts: vi.fn(),
  ships: [],
  faction: null,
  agent: null,
  setShips: vi.fn(),
  setFaction: vi.fn(),
  setAgent: vi.fn(),
  initGameState: vi.fn(),
};

const mockContract: Contract = {
  id: 'contract1',
  factionSymbol: 'faction1',
  terms: { deliver: [{ destinationSymbol: 'destination1' }] },
  expiration: 'expiration1',
  fulfilled: false,
  accepted: false,
  deadlineToAccept: 'deadline1',
} as Contract;

const mockSetContracts = vi.fn();

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn(() => true),
  },
}));

describe('ContractAcceptButton', () => {
  it('renders Accept button', () => {
    render(
      <Wrapper>
        <GameStateContext.Provider
          value={{
            ...mockGameStateContext,
            contracts: [mockContract],
            setContracts: mockSetContracts,
          }}
        >
          <ContractAcceptButton contract={mockContract} />
        </GameStateContext.Provider>
      </Wrapper>
    );

    expect(screen.getByText('Accept')).toBeInTheDocument();
  });
  it('calls acceptContract on button click', async () => {
    render(
      <Wrapper>
        <GameStateContext.Provider
          value={{
            ...mockGameStateContext,
            contracts: [mockContract],
            setContracts: mockSetContracts,
          }}
        >
          <ContractAcceptButton contract={mockContract} />
        </GameStateContext.Provider>
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Accept'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `https://api.spacetraders.io/v2/my/contracts/${mockContract.id}/accept`
      );
    });
  });
});
