import { GameState, GameWSEvents } from '@splash-software-crash/contracts';
import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { gameStateActions } from '../store/slices/game-state';
import { playersActions } from '../store/slices/players';

export class Engine {
  socket: Socket = null;

  connect() {
    if (this.socket) {
      return;
    }
    this.socket = io('localhost:3333', { autoConnect: true });
    this.socket.on(
      GameWSEvents.Joined.event,
      (payload: GameWSEvents.Joined.Payload) => {
        console.log('joined!', payload);
        store.dispatch(gameStateActions.setRate(payload.rate));
        store.dispatch(gameStateActions.setState(payload.state));
        store.dispatch(playersActions.setPlayers(payload.players));
      }
    );
    this.socket.on(
      GameWSEvents.StateIsChanged.event,
      (payload: GameWSEvents.StateIsChanged.Payload) => {
        store.dispatch(gameStateActions.setRate(payload.rate));
        store.dispatch(gameStateActions.setState(payload.state));
        store.dispatch(playersActions.setPlayers(payload.players));
        if (payload.state !== GameState.finalizing) {
          store.dispatch(gameStateActions.showSecretNumber(null));
        }
      }
    );
    this.socket.on(
      GameWSEvents.PlayingStateTick.event,
      (payload: GameWSEvents.PlayingStateTick.Payload) => {
        store.dispatch(gameStateActions.setRate(payload.rate));
        store.dispatch(gameStateActions.setState(payload.state));
        store.dispatch(playersActions.setPlayers(payload.players));
      }
    );
    this.socket.on(
      GameWSEvents.FinalizingState.event,
      (payload: GameWSEvents.FinalizingState.Payload) => {
        store.dispatch(gameStateActions.setRate(payload.rate));
        store.dispatch(gameStateActions.setState(payload.state));
        store.dispatch(playersActions.setPlayers(payload.players));
        store.dispatch(gameStateActions.showSecretNumber(payload.secretNumber));
      }
    );
  }

  disconnect() {
    this.socket.disconnect();
    this.socket = null;
  }

  async bet(guessedNumber: number) {
    const data: GameWSEvents.JoinGame.Request = {
      guessedNumber,
    };
    try {
      const res: GameWSEvents.JoinGame.Reponse = await this.socket.emitWithAck(
        GameWSEvents.JoinGame.event,
        data
      );
      console.log(res);
      alert('ok');
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }
}
