import { Task } from "../chart/Task";

export interface TaskGroupRowProps {
  groupName: string;
  tasks: Task[];
  chartStart: Date;
  chartEnd: Date;
}