export interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  created_at: string;
  default_branch: string;
  description: string | null;
  forks_count: number;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
}


