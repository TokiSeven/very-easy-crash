import { GameWSEvents } from '@splash-software-crash/contracts';
import { WSEvent } from '../ws-event';

export class GameJoined extends WSEvent {
  name: string = GameWSEvents.Joined.event;

  async payload(): Promise<GameWSEvents.Joined.Payload> {
    return {
      state: this.provider.getState(),
      rate: this.provider.getUIRate(),
      players: this.provider.getPlays().map((v) => ({
        id: v.user.id,
        name: v.user.name,
        bet: v.bet,
        guessedNumber: v.guessedNumber,
        cashout: v.cashout === null ? null : v.cashout,
      })),
    };
  }
}
