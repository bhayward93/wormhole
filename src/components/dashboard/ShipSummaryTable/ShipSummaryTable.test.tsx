import { it, expect, describe } from "vitest";
import { render, screen } from '@testing-library/react';
import { ShipSummaryTable } from './ShipSummaryTable';
import { GameStateContext } from '../../../context/gameState/GameStateContext';
import { Ship, ShipNav } from '../../../types/gameTypes';

describe('ShipSummaryTable', () => {
  it('should render the table headers', () => {
    render(
      <GameStateContext.Provider value={{ ships: [] } as any}>
        <ShipSummaryTable />
      </GameStateContext.Provider>
    );

    expect(screen.getByText('Your Ships')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
    expect(screen.getByText('Waypoint')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should render ship data', () => {
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

    render(
      <GameStateContext.Provider value={{ ships: mockShips } as any}>
        <ShipSummaryTable />
      </GameStateContext.Provider>
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
});
