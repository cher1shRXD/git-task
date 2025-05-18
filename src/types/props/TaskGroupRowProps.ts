import { Task } from "../schedule/Task";

export interface TaskGroupRowProps {
  groupName: string;
  tasks: Task[];
  chartStart: Date;
  chartEnd: Date;
}