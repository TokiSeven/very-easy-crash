import { GameState } from '@splash-software-crash/contracts';
import { UserEntity } from '../../user/user.entity';
import { Context } from './context';

export abstract class AbstractState {
  protected context: Context;

  setContext(context: Context) {
    this.context = context;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}

  abstract bet(user: UserEntity, guessedNumber: number): Promise<void>;

  abstract getState(): GameState;

  abstract getUIRate(): number;
}
