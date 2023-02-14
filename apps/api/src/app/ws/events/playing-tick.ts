import { GameWSEvents } from '@splash-software-crash/contracts';
import { WSEvent } from '../ws-event';

export class PlayingTick extends WSEvent {
  name: string = GameWSEvents.PlayingStateTick.event;

  async payload(): Promise<GameWSEvents.PlayingStateTick.Payload> {
    return {
      state: this.provider.getState(),
      rate: 1.5,
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
