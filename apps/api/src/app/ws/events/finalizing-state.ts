import { GameWSEvents } from '@splash-software-crash/contracts';
import { WSEvent } from '../ws-event';

export class FinalizingState extends WSEvent {
  name: string = GameWSEvents.FinalizingState.event;

  async payload(): Promise<GameWSEvents.FinalizingState.Payload> {
    return {
      state: this.provider.getState(),
      rate: this.provider.getUIRate(),
      players: this.provider.getPlays().map((v) => ({
        id: v.userId.toString(),
        name: v.userName,
        bet: v.bet,
        guessedNumber: v.guessedNumber,
        cashout: v.cashout === null ? null : v.cashout,
      })),
      secretNumber: this.provider.getSecretNumber(),
    };
  }
}
