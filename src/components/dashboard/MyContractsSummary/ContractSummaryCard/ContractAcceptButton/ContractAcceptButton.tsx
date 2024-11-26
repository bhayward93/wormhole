import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { GameStateContext } from '../../../../../context/game-state/GameStateContext';
import {
  acceptContract,
  GetContractResponse,
} from '../../../../../services/contracts-service/contracts-service';
import { Button } from '../../../../ui/button';
import { LoadingSpinner } from '../../../../common/LoadingSpinner/LoadingSpinner';
import { Contract } from '../../../../../types/game-types';

/** Contract accept button props. */
type ContractAcceptButtonProps = {
  contract: Contract;
};

/**
 * A button to accept a contract.
 * @param { ContractAcceptButtonProps } props - Props for the contract accept button.
 * @returns { JSX.Element } The contract accept button.
 */
export const ContractAcceptButton: React.FC<ContractAcceptButtonProps> = ({
  contract,
}) => {
  const { mutate, isLoading, error } = useMutation(acceptContract);
  const { contracts, setContracts } = useContext(GameStateContext);

  const handleAccept = () => {
    mutate(contract.id, {
      onSuccess: (data: GetContractResponse) => {
        setContracts(
          contracts.map((c: Contract) => {
            return c.id === contract.id ? data.data.contract : c;
          })
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleAccept} disabled={isLoading}>
        {isLoading ? <LoadingSpinner className="text-white" /> : 'Accept'}
      </Button>
      {error instanceof Error && (
        <div className="text-red-500">Error: {error.message}</div>
      )}
    </div>
  );
};
