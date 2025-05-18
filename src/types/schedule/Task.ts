export interface Task {
  taskName: string;
  startDate: string;
  endDate: string;
  connectedBranch: string;
  worker: string;
  isDone: boolean;
}