export interface User {
  login: string;
  id: number;
  name: string;
  company: string | null;
  blog: string | null;
  location: string;
  email: string | null;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string | null;
  updatedAt: string | null;
  avatarUrl: string;
  htmlUrl: string;
}