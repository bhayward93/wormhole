import { Contract } from '../../../../types/game-types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';

/** Contract summary card props. */
type MyContractsSummaryCardProps = {
  contract: Contract;
}

/**
 * A summary card for a given contract.
 * @param { MyContractsSummaryCardProps } props - Props for the contract summary card.
 * @returns { JSX.Element } The contract summary card.
 */
export function ContractSummaryCard({ contract }: MyContractsSummaryCardProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>id:</strong> {contract.id}</p>
        <p><strong>factionSymbol:</strong> {contract.factionSymbol}</p>
        <p><strong>Destination:</strong> {contract.terms.deliver[0].destinationSymbol}</p>
        <p><strong>Expiration:</strong> {contract.expiration}</p>
        <p><strong>Fulfilled:</strong> {contract.fulfilled ? "Fulfilled" : "Unfulfilled"}</p>
        <p><strong>Accepted:</strong> {contract.accepted ? "Accepted" : "Available"}</p>
        <p><strong>Deadline to Accept:</strong> {contract.deadlineToAccept}</p>
      </CardContent>
      <CardFooter>
        {!contract.accepted && !contract.fulfilled && (
          <Button>Accept</Button>
        )}
      </CardFooter>
    </Card>
  );
}