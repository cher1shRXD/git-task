import { GitHubOwner } from "./GitHubOwner";

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  createdAt: string;
  updatedAt: string;
  owner: GitHubOwner;
  defaultBranch: string;
  htmlUrl: string;
}