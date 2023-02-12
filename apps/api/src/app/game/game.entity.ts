import { UserPlay } from '../user/user.entity';

export class GameEntity {
  id: number;
  secretNumber: number;
  plays: UserPlay[];
}
