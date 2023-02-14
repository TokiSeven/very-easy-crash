import { UserPlay } from '../user/user.entity';

export class GameEntity {
  id: number;
  secretNumber: number;
  plays: (UserPlay & { user: { id: string; name: string } })[];
}
