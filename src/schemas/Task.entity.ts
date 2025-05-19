import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskGroup } from './TaskGroup.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  taskName: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  connectedBranch: string;

  @Column()
  worker: string;

  @Column({ default: false })
  isDone: boolean;

  @Column()
  taskGroupId: string;
  
  @ManyToOne(() => TaskGroup, (taskGroup) => taskGroup.tasks, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
  @JoinColumn({ name: 'taskGroupId' })
  @Exclude()
  taskGroup: TaskGroup;
}