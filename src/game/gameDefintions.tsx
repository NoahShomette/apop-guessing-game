/** A game session*/
export interface GameSession {
    /** What kind of session it is */
    sessionNetworkState: SessionNetworkState,
    activeQuestionState: ActiveQuestionState | null
}


/** The network state of the current game context
 * 
 * Host -> this user is hosting a game which has online turn on and has control of the game
 * Client -> This user has joined another users game
 * Offline -> This user is not online and controls their own game
 * 
*/
export enum SessionNetworkState {
    Host,
    Client,
    Offline

}

/** The network state of the current game context.
 * 
 * This should be treated like an enum however it is not an enum so that we can hold extra data inside it like the current host and user and such
 * 
 * Host -> this user is hosting a game which has online turn on and has control of the game
 * Client -> This user has joined another users game
 * Offline -> This user is not online and controls their own game
 * 
*/
export class GameNetworkStateTest {
    #host: string | null;
    #client: string | null;
    #offline: string | null;

    constructor(host: string | null, client: string | null, offline: string | null) {
        if (!host && !client && !offline) {
            throw new Error('GameNetworkState must have a state');
        }
        if ((host && client) || (host && offline) || (offline && client)) {
            throw new Error('GameNetworkState cannot have multiple values')
        }
        this.#host = null;
        this.#client = null;
        this.#offline = null;

        if (host !== null) {
            this.#host = host;
        } else if (client !== null) {
            this.#client = client;
        } else {
            this.#offline = offline as string;
        }
    }

}

// --------- QUESTIONS

/** A generated question and all its info needed to drive asking and answering questions.*/
export interface Question {
    questionType: QuestionType
    
}

/** The different types of questions
 * 
 * Sound -> plays a sound
 * Image -> shows one or more images
 * Text -> shows one or more texts
 * 
*/
export enum QuestionType {
    Sound,
    Image,
    Text,
}

/** The state of the currently active question */
export interface ActiveQuestionState {
    question: Question,
    questionState: QuestionState,
    timeInState: number
}

/** The different states that a question can be in */
export enum QuestionState {
    GeneratingQuestion,
    Quessing,
    QuestionResults
}
