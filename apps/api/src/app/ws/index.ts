import { GameState, GameWSEvents } from '@splash-software-crash/contracts';
import { Socket } from 'socket.io';
import { GameProvider } from '../game/provider';
import { UserEntity } from '../user/user.entity';
import { FinalizingState } from './events/finalizing-state';
import { GameJoined } from './events/game-joined';
import { PlayingTick } from './events/playing-tick';
import { StateIsChanged } from './events/state-is-changed';

export const onConnection = (socket: Socket, gameProvider: GameProvider) => {
  const player = new UserEntity();
  player.id = '54';
  player.balance = 10;
  player.name = 'RealUser';
  player.plays = [];

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

  socket.on(
    GameWSEvents.JoinGame.event,
    (data: GameWSEvents.JoinGame.Request, ack) => {
      if (!ack || typeof ack !== 'function') {
        console.warn('ack is not a function');
        return;
      }
      if (!data.guessedNumber || Number.isNaN(+data.guessedNumber)) {
        return ack('Provide correct guessed number');
      }
      try {
        gameProvider.joinGame(player, +data.guessedNumber);
        ack('ok');
      } catch (e) {
        ack(e);
      }
    }
  );
};
