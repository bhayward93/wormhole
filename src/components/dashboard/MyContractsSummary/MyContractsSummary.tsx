import { useContext, useMemo } from 'react';
import { GameStateContext } from '../../../context/game-state/GameStateContext';
import { Contract } from '../../../types/game-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { SummaryCardHeader } from '../SummaryCardHeader/SummaryCardHeader';
import { useQuery } from 'react-query';
import {
  getMyContracts,
  GetMyContractsResponse,
} from '../../../services/contracts-service/contracts-service';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
import { ContractSummaryCard } from './ContractSummaryCard/ContractSummaryCard';

/**
 * Summary of the logged in user's contracts.
 * @returns { JSX.Element } Contract summary.
 */
export function MyContractsSummary(): JSX.Element {
  const { contracts, setContracts } = useContext(GameStateContext);
  const { error, isFetching, refetch } = useQuery(
    'getMyContracts',
    getMyContracts,
    {
      enabled: !contracts?.length,
      onSuccess: (data: GetMyContractsResponse): void => {
        setContracts(data.data);
      },
      onError: (e: Error): void => {
        console.error(e);
      },
    }
  );

  const summaryCardHeader = useMemo(
    () => <SummaryCardHeader title="Your Contracts" onRefresh={refetch} />,
    [refetch]
  );

  if (error instanceof Error) {
    return (
      <>
        {summaryCardHeader}
        <div className="text-red-500">Error: {error.message}</div>
      </>
    );
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
      <Accordion type="single" collapsible className="w-full">
        {contracts?.map((contract: Contract) => (
          <AccordionItem value={contract.id} key={contract.id}>
            <AccordionTrigger
              data-testid={`contract-accordion-trigger-${contract.id}`}
            >
              {contract.id}
            </AccordionTrigger>
            <AccordionContent>
              <ContractSummaryCard contract={contract} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
