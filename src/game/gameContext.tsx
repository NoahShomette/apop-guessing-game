import { ReactNode, useContext, useEffect, useState } from 'react';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';
import { GameSession } from './gameDefintions';

type Props = {
    children: ReactNode;
};

// CORE CONTEXT

type gameContext = {
    /** The current game session */
    gameSession: GameSession | null,
    /** Function to overwrite the current game session with a new one */
    startNewGameSession: (newGame: GameSession) => void
}

export const GameContext = createContext<gameContext>({ gameSession: null, startNewGameSession: (newGame: GameSession) => { } });

export const useGame = () => {
    return useContext(GameContext);
};

export const GameProvider = ({ children }: Props) => {
    // function in context that calls the update
    const newGame = (newGame: GameSession) => {
        updateGame(newGame)
    }
    // Function which actually updates the game context
    const updateGame = (newGameSession: GameSession) => {
        setGameContext({ gameSession: newGameSession, startNewGameSession: newGame })
    }

    const [gameContext, setGameContext] = useState<gameContext>({ gameSession: null, startNewGameSession: newGame });



    return (
        <GameContext.Provider value={gameContext}>
            {children}
        </GameContext.Provider>
    );
};
