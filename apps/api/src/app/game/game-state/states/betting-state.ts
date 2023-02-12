import { PlayingState } from './playing-state';
import { UserEntity, UserPlay } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { GameEntity } from '../../game.entity';
import { log } from 'console';

export class BettingState extends AbstractState {
  private pendingBets = 0;
  private joinedUsers = 0;
  private betAmount = 10;
  private minUsersToPlay = 5;

  init() {
    this.context.setActiveGame(this.generateNewGame());
  }

  async bet(user: UserEntity, guessedNumber: number): Promise<void> {
    log(`betting for ${user.id}...`);
    this.pendingBets++;
    try {
      user.balance -= this.betAmount;
      const play: UserPlay = {
        gameId: this.context.activeGame().id,
        guessedNumber,
        bet: this.betAmount,
        createdAt: new Date(),
      };
      user.plays.push(play);
      this.joinedUsers++;
      this.context.activeGame().plays.push(play);
    } finally {
      this.pendingBets--;
    }
    if (!this.pendingBets && this.joinedUsers >= this.minUsersToPlay) {
      log(`playing!`);
      this.context.setState(new PlayingState());
    }
  }

  generateNewGame(): GameEntity {
    const game = new GameEntity();
    game.id = this.context.activeGame()?.id + 1;
    game.plays = [];
    game.secretNumber = Math.floor(Math.random() * 1000) / 100;
    return game;
  }
}
