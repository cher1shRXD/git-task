import { Task } from "./Task";

export interface TaskGroup {
  taskGroupName: string;
  tasks: Task[];
}