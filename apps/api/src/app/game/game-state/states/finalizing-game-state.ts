import { BettingState } from './betting-state';
import { UserEntity } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { log } from 'console';
import { GameState } from '@splash-software-crash/contracts';
import { ds } from '../../../../ds';
import { GameEntity } from '../../game.entity';

export class FinalizingGameState extends AbstractState {
  init() {
    this.cashoutPlays();
    setTimeout(() => {
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
        // await ds.manager.update(
        //   UserEntity,
        //   { _id: play.userId },
        //   { balance: player.balance + play.cashout }
        // );
        // await UserEntity.save({ _id: player.id, ...player });
        await player.save();
        // await ds.manager.save(player);
      }
    }
    log(this.context.activeGame().plays);
    log(`betting...`);
    // await ds.manager.update(
    //   GameEntity,
    //   { _id: this.context.activeGame()._id },
    //   {
    //     plays: this.context.activeGame().plays,
    //     latestRate: this.context.activeGame().latestRate,
    //   }
    // );
    // const g = this.context.activeGame();
    // await GameEntity.save({ _id: g.id, ...g });
    await this.context.activeGame().save();
    // await ds.manager.save(this.context.activeGame());
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
