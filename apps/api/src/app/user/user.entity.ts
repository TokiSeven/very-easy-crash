import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

export class UserPlay {
  constructor(
    gameId: number,
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
  gameId: number;

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
