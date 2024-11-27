import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { GameStateContext } from '../../../../../context/game-state/GameStateContext';
import {
  acceptContract,
  AcceptContractResponse,
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
}): JSX.Element => {
  const { mutate, isLoading, error } = useMutation(acceptContract);
  const { contracts, setContracts } = useContext(GameStateContext);

  /**
   * Handle accepting the contract by calling to mutate and updating
   * local game state context.
   * @returns { void }
   */
  const handleAccept = (): void => {
    mutate(contract.id, {
      onSuccess: (data: AcceptContractResponse): void => {
        setContracts(
          contracts.map((c: Contract): Contract => {
            return c.id === contract.id ? data.data.contract : c;
          })
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {isLoading ? (
        <LoadingSpinner className="text-white" />
      ) : (
        <Button onClick={handleAccept} disabled={isLoading}>
          Accept
        </Button>
      )}
      {error instanceof Error && (
        <p className="text-red-500" role="alert">
          Error: {error.message}
        </p>
      )}
    </div>
  );
};
