import { PlayerDTO } from '../players';
import { GameState } from './state';

export namespace GameWSEvents {
  export namespace Joined {
    export const event = 'game-joined';

    export interface Payload {
      state: GameState;
      rate: number;
      players: PlayerDTO[];
    }
  }

  export namespace StateIsChanged {
    export const event = 'game-state-is-changed';

    export interface Payload {
      state: GameState;
      rate: number;
      players: PlayerDTO[];
    }
  }

  export namespace PlayingStateTick {
    export const event = 'game-playing-state-tick';

    export interface Payload {
      state: GameState;
      rate: number;
      players: PlayerDTO[];
    }
  }

  export namespace FinalizingState {
    export const event = 'game-playing-state-tick';

    export interface Payload {
      state: GameState;
      rate: number;
      secretNumber: number;
      players: PlayerDTO[];
    }
  }
}
