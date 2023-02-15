import { GameWSEvents } from '@splash-software-crash/contracts';
import { cleanPlay } from '../utils/clean-play';
import { WSEvent } from '../ws-event';

export class StateIsChanged extends WSEvent {
  name: string = GameWSEvents.StateIsChanged.event;

  async payload(): Promise<GameWSEvents.StateIsChanged.Payload> {
    return {
      state: this.provider.getState(),
      rate: this.provider.getUIRate(),
      players: this.provider.getPlays().map((v) => cleanPlay(v)),
    };
  }
}
