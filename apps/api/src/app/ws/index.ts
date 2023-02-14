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
  player.id = 'id-5';
  player.balance = 10;
  player.name = 'RealUser';
  player.plays = [];

  new GameJoined(gameProvider).emitTo(socket);

  const events = {
    stateIsChanged: new StateIsChanged(gameProvider),
    finalizingState: new FinalizingState(gameProvider),
    playingTick: new PlayingTick(gameProvider),
  };

  gameProvider.bindStateChanged(() => {
    events.stateIsChanged.emitTo(socket);
    if (gameProvider.getState() === GameState.finalizing) {
      events.finalizingState.emitTo(socket);
    }
  });

  gameProvider.bindPlayingTick(() => {
    events.playingTick.emitTo(socket);
  });

  socket.on(
    GameWSEvents.JoinGame.event,
    async (data: GameWSEvents.JoinGame.Request, ack) => {
      if (!ack || typeof ack !== 'function') {
        console.warn('ack is not a function');
        return;
      }
      if (
        !data.guessedNumber ||
        Number.isNaN(+data.guessedNumber) ||
        +data.guessedNumber < 1
      ) {
        return ack('Provide correct guessed number');
      }
      try {
        await gameProvider.joinGame(player, +data.guessedNumber);
        ack(null);
      } catch (e) {
        ack(e.message);
      }
    }
  );
};
