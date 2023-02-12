export type UserPlay = {
  gameId: number;
  guessedNumber: number;
  bet: number;
  cashout?: number;
  createdAt: Date;
};

export class UserEntity {
  id: string;
  name: string;
  balance: number;
  plays: UserPlay[];
}
