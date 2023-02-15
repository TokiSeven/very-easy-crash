import { UserPlay } from '../../user/user.entity';

export const cleanPlay = (v: UserPlay) => ({
  id: v.userId.toString(),
  name: v.userName,
  bet: v.bet,
  guessedNumber: v.guessedNumber,
  cashout: v.cashout === null ? null : v.cashout,
});
