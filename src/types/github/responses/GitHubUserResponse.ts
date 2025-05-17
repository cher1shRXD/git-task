export interface GitHubUserResponse {
  login: string;
  id: number;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string
  avatar_url: string;
  html_url: string;
}