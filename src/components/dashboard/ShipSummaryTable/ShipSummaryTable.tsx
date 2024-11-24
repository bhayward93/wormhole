import { useContext } from 'react';
import { GameStateContext } from '../../../context/gameState/GameStateContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Ship } from '../../../types/gameTypes';

/**
 * Table that gives a summary of the logged in user's ships.
 * @returns { JSX.Element } Ship summary table.
 */
export function ShipSummaryTable(): JSX.Element {
  const { ships } = useContext(GameStateContext);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Ships</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>System</TableHead>
            <TableHead>Waypoint</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {ships.map((ship: Ship) => (
              <TableRow key={ship.symbol}>
                <TableCell className="text-medium">{ship.symbol}</TableCell>
                <TableCell>{ship.nav.systemSymbol}</TableCell>
                <TableCell>{ship.nav.waypointSymbol}</TableCell>
                <TableCell>{ship.nav.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
