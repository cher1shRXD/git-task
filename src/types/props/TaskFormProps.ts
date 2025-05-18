import { Task } from "../schedule/Task";
import { TaskGroup } from "../schedule/TaskGroup";
import { GitHubBranch } from "../github/GitHubBranch";

export interface TaskFormProps {
  selectedGroup: string;
  form: Task;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOrUpdate: () => void;
  handleAddGroup: (name: string) => void;
  taskGroups: TaskGroup[];
  onSelectGroup: (groupName: string) => void;
  onSelectBranch: (branch: string) => void;
  branchList: GitHubBranch[];
  selectedBranch: string;
  addNewBranch: (name: string) => void;
  deleteTaskGroup: (taskGroupName: string) => void;
  isEditing: boolean;
}