import { GitHubRepoResponse } from "./GitHubRepoResponse";

export interface GitHubOrganizationResponse {
  id: number;
  login: string;
  url: string;
  avatar_url: string;
  description: string | null;
  repos: GitHubRepoResponse[];
}