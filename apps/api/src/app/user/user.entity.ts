import {
  Entity,
  ObjectIdColumn,
  Column,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';

export class UserPlay {
  constructor(
    gameId: string,
    guessedNumber: number,
    bet: number,
    cashout: number | null,
    createdAt: Date,
    userId: string,
    userName: string
  ) {
    this.gameId = gameId;
    this.guessedNumber = guessedNumber;
    this.bet = bet;
    this.cashout = cashout;
    this.createdAt = createdAt;
    this.userId = userId;
    this.userName = userName;
  }

  @Column()
  gameId: string;

  @Column()
  guessedNumber: number;

  @Column()
  bet: number;

  @Column()
  cashout: number;

  @Column()
  createdAt: Date;

  @Column()
  userId: string;

  @Column()
  userName: string;
}

@Entity()
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  balance: number;

  @Column((type) => UserPlay)
  plays: UserPlay[];
}
