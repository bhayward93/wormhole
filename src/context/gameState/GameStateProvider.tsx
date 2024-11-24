import { PropsWithChildren, useState } from "react";
import { GameState, GameStateContext } from "./GameStateContext";
import { Contract, Faction, Ship } from "../../types/gameTypes";
import { Agent } from "http";

/** Props for the game state provider. */   
export type GameStateProviderProps = PropsWithChildren;

/**
 * Game state provider.
 * @param { GameStateProviderProps } props - props.
 * @returns { JSX.Element } Game state provider.
 */
export function GameStateProvider({ children }: GameStateProviderProps): JSX.Element {
    const [ships, setShips] = useState<Ship[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [faction, setFaction] = useState<Faction | null>(null);
    const [agent, setAgent] = useState<Agent | null>(null);

    /**
     * Init game state.
     * @param { GameState } state - The game state.
     */
    const initGameState = (state: GameState): void => {
        setShips(state.ships);
        setContracts(state.contracts);
        setFaction(state.faction);
        setAgent(state.agent);
    }

    return (
        <GameStateContext.Provider value={{ships, setShips, contracts, setContracts, faction, setFaction, agent, setAgent, initGameState}}>
            { children }
        </GameStateContext.Provider>
    );
}