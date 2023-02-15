import { DataSource } from 'typeorm';
import { GameEntity } from './app/game/game.entity';
import { UserEntity } from './app/user/user.entity';

export const ds = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: 'root',
  password: 'pass',
  name: 'default',
  entities: [UserEntity, GameEntity],
});
