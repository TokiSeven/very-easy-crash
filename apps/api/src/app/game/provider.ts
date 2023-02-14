import { UserEntity } from '../user/user.entity';
import { Context } from './game-state/context';

export class GameProvider {
  constructor(private ctx: Context) {}

  getState() {
    return this.ctx.getGameState();
  }

  getUIRate() {
    return this.ctx.getUIRate();
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

  bindPlayingTick(callback: (uiNumber: number) => void) {
    this.ctx.on('playing-tick', callback);
  }

  joinGame(player: UserEntity, guessedNumber: number) {
    return this.ctx.bet(player, guessedNumber);
  }
}
