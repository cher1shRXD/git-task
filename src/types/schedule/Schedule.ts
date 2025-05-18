import { TaskGroup } from "./TaskGroup";

export interface Schedule {
  scheduleId: string;
  repositoryName: string;
  isTrunkBase: boolean;
  taskGroups: TaskGroup[];
}