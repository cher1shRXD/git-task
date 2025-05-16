import { TaskGroup } from "../chart/TaskGroup";

export interface GanttChartProps {
  taskGroups: TaskGroup[];
  onEdit: (groupName: string, index: number) => void;
  onDelete: (groupName: string, index: number) => void;
}