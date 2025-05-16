import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Task } from './Task.entity';

@Entity()
@Unique(["repositoryName"])
export class TaskGroup {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  repositoryName: string;

  @Column()
  taskGroupName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.taskGroup, { cascade: true })
  tasks: Task[];
}