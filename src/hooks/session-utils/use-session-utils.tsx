import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GameStateContext } from '../../context/game-state/GameStateContext';
import { useQueryClient } from 'react-query';

/**
 * Session hook type. */
type UseSessionReturnType = {
  logout: () => void;
};

/**
 * Session utilities hook.
 * @returns { UseSessionReturnType }
 */
export const useSessionUtils = (): UseSessionReturnType => {
  const { setToken } = useContext(AuthContext);
  const { initGameState } = useContext(GameStateContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    initGameState({
      ships: [],
      contracts: [],
      faction: null,
      agent: null,
    });
    setToken(null);
    queryClient.removeQueries();
    navigate('/');
  };

  return { logout };
};
