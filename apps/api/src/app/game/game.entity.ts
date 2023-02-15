import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserPlay } from '../user/user.entity';

@Entity()
export class GameEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  secretNumber: number;

  @Column()
  latestRate: number;

  @Column((type) => UserPlay)
  plays: UserPlay[];
}
