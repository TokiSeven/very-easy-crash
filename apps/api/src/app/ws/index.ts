import { GameState } from '@splash-software-crash/contracts';
import { Socket } from 'socket.io';
import { GameProvider } from '../game/provider';
import { FinalizingState } from './events/finalizing-state';
import { GameJoined } from './events/game-joined';
import { PlayingTick } from './events/playing-tick';
import { StateIsChanged } from './events/state-is-changed';

export const onConnection = (socket: Socket, gameProvider: GameProvider) => {
  new GameJoined(gameProvider).emitTo(socket);

  gameProvider.bindStateChanged(() => {
    new StateIsChanged(gameProvider).emitTo(socket);
    if (gameProvider.getState() === GameState.finalizing) {
      new FinalizingState(gameProvider).emitTo(socket);
    }
  });

  gameProvider.bindPlayingTick(() => {
    new PlayingTick(gameProvider).emitTo(socket);
  });
};
