import { Context } from './game-state/context';

export class GameProvider {
  constructor(private ctx: Context) {}

  getState() {
    return this.ctx.getGameState();
  }

  getPlays() {
    return this.ctx.activeGame().plays;
  }

  getSecretNumber() {
    return this.ctx.activeGame().secretNumber;
  }

  bindStateChanged(callback: () => void) {
    this.ctx.on('state-changed', callback);
  }

  bindPlayingTick(callback: () => void) {
    this.ctx.on('playing-tick', callback);
  }
}
