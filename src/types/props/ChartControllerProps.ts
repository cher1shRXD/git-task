import { GitHubBranch } from "../github/GitHubBranch";
import { Schedule } from "../schedule/Schedule";

export interface ChartControllerProps {
  branches: GitHubBranch[];
  defaultBranch?: string;
  repoName?: string;
  ownerName?: string;
  schedule?: Schedule;
}