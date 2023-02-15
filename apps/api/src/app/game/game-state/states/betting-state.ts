import { GameState } from '@splash-software-crash/contracts';
import { log } from 'console';
import { UserEntity, UserPlay } from '../../../user/user.entity';
import { GameEntity } from '../../game.entity';
import { AbstractState } from '../abstract-state';
import { PlayingState } from './playing-state';

export class BettingState extends AbstractState {
  private pendingBets = 0;
  private joinedUsers = 0;
  private betAmount = 10;
  private minUsersToPlay = 5;

  async init() {
    this.context.clearPlayers();
    const bots = await Promise.all(
      new Array(4).fill(0).map(async (v, i) => {
        const user = await this.findOrCreateBot(i);
        return { user, guessedNumber: Math.floor(Math.random() * 1000) / 100 };
      })
    );
    this.context.setActiveGame(await this.generateNewGame());
    await Promise.all(bots.map((v) => this.bet(v.user, v.guessedNumber)));
  }

  async findOrCreateBot(index: number) {
    let user = await UserEntity.findOne({
      where: { id: (index + 1).toString() },
    });
    if (!user) {
      user = new UserEntity();
      user.id = (index + 1).toString();
      user.name = `bot #${index + 1}`;
      user.balance = 100;
      user.plays = [];
    }
    return user;
  }

  async bet(user: UserEntity, guessedNumber: number): Promise<void> {
    log(`betting for ${user.id}...`);
    this.pendingBets++;
    try {
      user.balance -= this.betAmount;
      const play = new UserPlay(
        this.context.activeGame().id,
        guessedNumber,
        this.betAmount,
        null,
        new Date(),
        user.id,
        user.name
      );
      user.plays.push(play);
      await user.save();
      this.joinedUsers++;
      this.context.activeGame().plays.push(play);
      this.context.pushPlayer(user);
    } finally {
      this.pendingBets--;
    }
    if (!this.pendingBets && this.joinedUsers >= this.minUsersToPlay) {
      log(`playing!`);
      await this.context.setState(new PlayingState());
    }
  }

  async generateNewGame(): Promise<GameEntity> {
    let game = await GameEntity.findOne({ where: { ended: false } });
    if (!game) {
      game = new GameEntity();
      game.id = (this.context.activeGame()?.id || 0) + 1;
      game.plays = [];
      game.secretNumber = Math.floor(Math.random() * 1000) / 100;
      game.latestRate = 0;
      game.ended = false;
      await game.save();
    }
    return game;
  }

  getState(): GameState {
    return GameState.betting;
  }

  getUIRate(): number {
    return 0.0;
  }
}
