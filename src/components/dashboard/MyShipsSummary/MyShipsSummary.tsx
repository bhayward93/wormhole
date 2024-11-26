import { useContext, useEffect, useMemo } from 'react';
import { GameStateContext } from '../../../context/game-state/GameStateContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Ship } from '../../../types/game-types';
import { getMyShips } from '../../../services/ships-service/my-ships-service';
import { useQuery } from 'react-query';
import { SummaryCardHeader } from '../SummaryCardHeader/SummaryCardHeader';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';

/**
 * Table that gives a summary of the logged in user's ships.
 * @returns { JSX.Element } Ship summary table.
 */
export function MyShipsSummary(): JSX.Element {
  const { ships, setShips } = useContext(GameStateContext);
  const { data, error, isFetching, refetch } = useQuery('getMyShips', getMyShips, {
    enabled: false
  });

  useEffect(() => {
    if (data?.data) {
      setShips(data.data);
    } else {
      refetch();
    }
  }, [data, setShips, refetch]);

  const summaryCardHeader = useMemo(() => <SummaryCardHeader title="Your Ships" onRefresh={refetch} />, [refetch]);

  if (error instanceof Error) {
    return (
      <>
        {summaryCardHeader}
        <div className="text-red-500">Error: {error.message}</div>
      </>
    )
  }

  if (isFetching) {
    return (
      <>
        {summaryCardHeader}
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      {summaryCardHeader}
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
