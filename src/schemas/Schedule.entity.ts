import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { TaskGroup } from './TaskGroup.entity';

@Entity()
@Unique(["repositoryName"])
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  repositoryName: string;

  @Column()
  isTrunkBase: boolean;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.schedule, { cascade: true, eager: true })
  taskGroups: TaskGroup[];
}