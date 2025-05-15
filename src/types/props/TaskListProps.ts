import { TaskGroup } from "../chart/TaskGroup";

export interface TaskListProps {
  taskGroups: TaskGroup[];
  onEdit: (groupName: string, index: number) => void;
  onDelete: (groupName: string, index: number) => void;
  onSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}