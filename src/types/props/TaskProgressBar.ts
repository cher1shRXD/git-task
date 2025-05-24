export interface TaskProgressBarProps {
  totalTasks: number;
  completedTasks: number;
  title?: string;
  showDetails?: boolean;
  animated?: boolean;
}