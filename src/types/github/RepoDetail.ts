import { GitHubBranch } from "./GitHubBranch";
import { GitHubRepo } from "./GitHubRepo";

export interface RepoDetail extends GitHubRepo {
  branches: GitHubBranch[];
  commitCount: number;
}