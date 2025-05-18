import { TaskGroup } from "../schedule/TaskGroup";

export interface TaskListProps {
  taskGroups: TaskGroup[];
  onSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}