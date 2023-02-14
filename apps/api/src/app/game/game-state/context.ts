import { GameEntity } from '../game.entity';
import { UserEntity } from '../../user/user.entity';
import { AbstractState } from './abstract-state';
import EventEmitter = require('events');

// [betting -> playing -> finalizing game] -> [...]
export class Context extends EventEmitter {
  private state: AbstractState;

  private game: GameEntity;

  setState(state: AbstractState) {
    this.emit('state-changed');
    this.state = state;
    this.state.setContext(this);
    this.state.init();
  }

  getGameState() {
    return this.state.getState();
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
