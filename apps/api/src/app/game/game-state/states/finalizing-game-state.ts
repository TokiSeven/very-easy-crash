import { BettingState } from './betting-state';
import { UserEntity } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { log } from 'console';

export class FinalizingGameState extends AbstractState {
  init() {
    this.cashoutPlays();
    this.context.setState(new BettingState());
  }

  cashoutPlays() {
    for (const play of this.context.activeGame().plays) {
      const won = play.guessedNumber <= this.context.activeGame().secretNumber;
      play.cashout = won ? play.bet * play.guessedNumber : 0;
    }
    log(this.context.activeGame().plays);
    log(`betting...`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bet(user: UserEntity, guessedNumber: number): Promise<void> {
    throw new Error('Can not do it right now');
  }
}