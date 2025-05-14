import { GitHubRepo } from "./GitHubRepo";

export interface GitHubOrgWithRepos {
  id: number;
  login: string;
  url: string;
  avatarUrl: string;
  description: string;
  repos: GitHubRepo[];
  error?: string;
}