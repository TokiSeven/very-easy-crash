import { FinalizingGameState } from './finalizing-game-state';
import { UserEntity } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { log } from 'console';
import { GameState } from '@splash-software-crash/contracts';

export class PlayingState extends AbstractState {
  private tickPeriodMs = 100;
  private expRate = 0.1;
  private uiNumber = 0.01;

  init() {
    this.tick();
  }

  tick() {
    this.uiNumber = 2 ** this.expRate;
    this.expRate += 0.1;
    log(this.uiNumber);
    console.log(
      'sec / ui',
      this.context.activeGame().secretNumber,
      this.uiNumber
    );
    this.context.emit('playing-tick');
    if (this.context.activeGame().secretNumber <= this.uiNumber) {
      log(`finalizing...`);
      this.context.setState(new FinalizingGameState());
    } else {
      setTimeout(this.tick.bind(this), this.tickPeriodMs);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bet(user: UserEntity, guessedNumber: number): Promise<void> {
    throw new Error('Can not bet right now.');
  }

  getState(): GameState {
    return GameState.playing;
  }
}
