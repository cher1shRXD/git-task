import { TaskGroup } from "../chart/TaskGroup";

export interface TaskListProps {
  taskGroups: TaskGroup[];
  onSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}