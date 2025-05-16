import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskGroup } from './TaskGroup.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  taskName: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  connectedBranch: string;

  @Column()
  worker: string;

  @Column({ default: false })
  isDone: boolean;

  @Column()
  taskGroupId: string;
  
  @ManyToOne(() => TaskGroup, (taskGroup) => taskGroup.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskGroupId' })
  taskGroup: TaskGroup;
}