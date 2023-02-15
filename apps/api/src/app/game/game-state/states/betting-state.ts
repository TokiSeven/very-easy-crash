import { PlayingState } from './playing-state';
import { UserEntity, UserPlay } from '../../../user/user.entity';
import { AbstractState } from '../abstract-state';
import { GameEntity } from '../../game.entity';
import { log } from 'console';
import { GameState } from '@splash-software-crash/contracts';
import { ds } from '../../../../ds';

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
      // await ds.manager.update(
      //   UserEntity,
      //   { _id: user._id },
      //   { balance: user.balance }
      // );
      await user.save();
      // await ds.manager.save(UserEntity, user);
      this.joinedUsers++;
      this.context.activeGame().plays.push(play);
      this.context.pushPlayer(user);
    } finally {
      this.pendingBets--;
    }
    if (!this.pendingBets && this.joinedUsers >= this.minUsersToPlay) {
      log(`playing!`);
      this.context.setState(new PlayingState());
    }
  }

  async generateNewGame(): Promise<GameEntity> {
    let game = new GameEntity();
    game.plays = [];
    game.secretNumber = Math.floor(Math.random() * 1000) / 100;
    game.latestRate = 0;
    await game.save();
    // await ds.manager.save(game);
    return game;
  }

  getState(): GameState {
    return GameState.betting;
  }

  getUIRate(): number {
    return 0.0;
  }
}
