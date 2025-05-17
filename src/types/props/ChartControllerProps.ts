import { TaskGroup } from "../chart/TaskGroup";
import { GitHubBranch } from "../github/GitHubBranch";

export interface ChartControllerProps {
  branches: GitHubBranch[];
  defaultBranch?: string;
  repoName?: string;
  ownerName?: string;
  schedule?: TaskGroup[];
}