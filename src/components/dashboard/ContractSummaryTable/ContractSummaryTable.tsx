import { useContext } from 'react';
import { GameStateContext } from '../../../context/gameState/GameStateContext';
import { Contract } from '../../../types/gameTypes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

/**
 * Table that gives a summary of the logged in user's contracts.
 * @returns { JSX.Element } Contract summary table.
 */
export function ContractSummaryTable(): JSX.Element {
  const { contracts } = useContext(GameStateContext);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Contracts</h2>
      <Accordion type="single" collapsible className="w-full">
        { contracts.map((contract: Contract) => (
          <AccordionItem value={contract.id} key={contract.id}>
            <AccordionTrigger data-testid={`contract-accordion-trigger-${contract.id}`}>{contract.id}</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>{contract.id}</CardTitle>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
