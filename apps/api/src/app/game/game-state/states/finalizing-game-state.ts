import { GameState } from '@splash-software-crash/contracts';
import { log } from 'console';
import { UserEntity } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { BettingState } from './betting-state';

export class FinalizingGameState extends AbstractState {
  init() {
    this.cashoutPlays();
    setTimeout(() => {
      console.log('tick!LKWSDLKAJDSLKADLKJ');
      this.context.setState(new BettingState());
    }, 5000);
  }

  async cashoutPlays() {
    for (const play of this.context.activeGame().plays) {
      const won = play.guessedNumber <= this.context.activeGame().secretNumber;
      play.cashout = won ? play.bet * play.guessedNumber : 0;
      const player = this.context
        .getPlayers()
        .find((player) => player.id === play.userId);
      if (!player) {
        console.warn({ play });
      } else {
        player.balance += play.cashout;
        await player.save();
      }
    }
    log(this.context.activeGame().plays);
    log(`betting...`);
    this.context.activeGame().ended = true;
    await this.context.activeGame().save();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bet(user: UserEntity, guessedNumber: number): Promise<void> {
    throw new Error('Can not do it right now');
  }

  getState(): GameState {
    return GameState.finalizing;
  }

  getUIRate(): number {
    return this.context.activeGame().latestRate;
  }
}
