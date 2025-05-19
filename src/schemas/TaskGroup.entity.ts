import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './Task.entity';
import { Schedule } from './Schedule.entity';
import { Type } from 'class-transformer'

@Entity()
export class TaskGroup {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  taskGroupName: string;

  @OneToMany(() => Task, (task) => task.taskGroup, { cascade: true })
  @Type(() => Task)
  tasks: Task[];

  @ManyToOne(() => Schedule, (schedule) => schedule.taskGroups, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'scheduleId' })
  schedule: Schedule;
}