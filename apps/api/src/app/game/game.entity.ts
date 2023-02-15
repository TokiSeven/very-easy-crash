import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { UserPlay } from '../user/user.entity';

@Entity()
export class GameEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: number;

  @Column()
  secretNumber: number;

  @Column()
  latestRate: number;

  @Column()
  ended: boolean;

  @Column((type) => UserPlay)
  plays: UserPlay[];
}
