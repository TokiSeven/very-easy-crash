import { PlayingState } from './playing-state';
import { UserEntity, UserPlay } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { GameEntity } from '../../game.entity';
import { log } from 'console';
import { GameState } from '@splash-software-crash/contracts';

export class BettingState extends AbstractState {
  private pendingBets = 0;
  private joinedUsers = 0;
  private betAmount = 10;
  private minUsersToPlay = 5;

  init() {
    const bots: UserEntity[] = new Array(4).fill(0).map((v, i) => ({
      id: `id-${i}`,
      name: `bot #${i + 1}`,
      balance: 100,
      plays: [],
      guessedNumber: Math.floor(Math.random() * 1000) / 100,
    }));
    this.context.setActiveGame(this.generateNewGame());
    Promise.all(
      bots.map((v) =>
        this.bet(v, (v as UserEntity & { guessedNumber: number }).guessedNumber)
      )
    );
    log(`done!`);
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
      this.context
        .activeGame()
        .plays.push({ ...play, user: { id: user.id, name: user.name } });
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

  getState(): GameState {
    return GameState.betting;
  }
}
