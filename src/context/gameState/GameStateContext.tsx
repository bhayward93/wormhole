import { createContext } from "react";
import { Contract, Faction, Ship } from "../../types/gameTypes";
import { Agent } from "http";

/** Game state. */
export type GameState = {
    ships: Ship[];
    contracts: Contract[];
    faction: Faction | null;
    agent: Agent | null;
}

/** Game state context type. */
type GameStateContextType = GameState & {
    setShips: (ships: Ship[]) => void;
    setContracts: (contracts: Contract[]) => void;
    setFaction: (faction: Faction | null) => void;
    setAgent: (agent: Agent | null) => void;
    initGameState: (state: GameState) => void;
}

/** Game state context. */
export const GameStateContext = createContext<GameStateContextType>({
    ships: [],
    setShips: () => void 0,
    contracts: [],
    setContracts: () => void 0,
    faction: null,
    setFaction: () => void 0,
    agent: null,
    setAgent: () => void 0,
    initGameState: () => void 0,
});
