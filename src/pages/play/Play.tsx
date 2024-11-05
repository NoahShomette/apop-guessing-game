import React, { useContext } from "react";
import styles from "./Play.module.css";
import { useGame } from "../../game/gameContext";
import { SessionNetworkState } from "../../game/gameDefintions";

function Play() {
    const game_context = useGame();
    if (!game_context.gameSession) {
        game_context.startNewGameSession({ sessionNetworkState: SessionNetworkState.Offline, activeQuestionState: null });
    }
    return (
        <>
            <h1>Play!</h1>
            <div className={styles.authenticationHolder}>
                {game_context.gameSession?.sessionNetworkState}
            </div>
        </>
    );
};

export default Play;
