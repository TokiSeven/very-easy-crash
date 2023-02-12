import { GameEntity } from '../game.entity';
import { UserEntity } from '../../user/user.entity';
import { AbstractState } from './abstract-state';

// [betting -> playing -> finalizing game] -> [...]
export class Context {
  private state: AbstractState;

  private game: GameEntity;

  setState(state: AbstractState) {
    this.state = state;
    this.state.setContext(this);
    this.state.init();
  }

  setActiveGame(game: GameEntity) {
    this.game = game;
  }

  activeGame() {
    return this.game;
  }

  bet(user: UserEntity, guessedNumber: number): Promise<void> {
    return this.state.bet(user, guessedNumber);
  }
}
