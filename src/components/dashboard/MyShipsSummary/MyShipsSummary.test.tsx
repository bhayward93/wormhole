import { it, expect, describe, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { MyShipsSummary } from './MyShipsSummary';
import { GameStateContext, GameStateContextType } from '../../../context/game-state/GameStateContext';
import { Ship, ShipNav } from '../../../types/game-types';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const mockShips: Ship[] = [
  {
    symbol: 'ship1',
    nav: {
      systemSymbol: 'system1',
      waypointSymbol: 'waypoint1',
      status: 'active1',
    } as ShipNav,
  } as Ship,
  {
    symbol: 'ship2',
    nav: {
      systemSymbol: 'system2',
      waypointSymbol: 'waypoint2',
      status: 'active2',
    } as ShipNav,
  } as Ship,
];

const mockGameStateContext: GameStateContextType = {
  ships: [],
  faction: null,
  agent: null,
  contracts: [],
  setShips: vi.fn(),
  setFaction: vi.fn(),
  setAgent: vi.fn(),
  setContracts: vi.fn(),
  initGameState: vi.fn(),
};

describe('MyShipsSummary', () => {
  it('should render the table headers', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{ ...mockGameStateContext, ships: [] }}>
          <MyShipsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText('Your Ships')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
    expect(screen.getByText('Waypoint')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should render ship data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{ ...mockGameStateContext, ships: mockShips }}>
          <MyShipsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText('ship1')).toBeInTheDocument();
    expect(screen.getByText('system1')).toBeInTheDocument();
    expect(screen.getByText('waypoint1')).toBeInTheDocument();
    expect(screen.getByText('active1')).toBeInTheDocument();
    expect(screen.getByText('ship2')).toBeInTheDocument();
    expect(screen.getByText('system2')).toBeInTheDocument();
    expect(screen.getByText('waypoint2')).toBeInTheDocument();
    expect(screen.getByText('active2')).toBeInTheDocument();
  });

  it("calls to refetch and render data if data is not present", async () => {
    vi.mock('axios', () => ({
      default: {
        get: vi.fn(() => ({ data: { data: null } }))
      }
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <GameStateContext.Provider value={{ ...mockGameStateContext, ships: [] }}>
          <MyShipsSummary />
        </GameStateContext.Provider>
      </QueryClientProvider>
    );
  });
});
