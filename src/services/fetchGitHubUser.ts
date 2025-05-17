import { GitHubUserResponse } from "@/types/github/responses/GitHubUserResponse";
import { User } from "@/types/github/User";
import axios from "axios";

export const fetchGitHubUser = async (accessToken: string): Promise<User> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try{
    const { data } = await axios.get<GitHubUserResponse>('https://api.github.com/user', { headers });
    return {
      login: data.login,
      id: data.id,
      name: data.name,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url
    }
  }catch{
    return {
      login: "unknown",
      id: 0,
      name: "Unknown User",
      company: null,
      blog: null,
      location: "Unknown",
      email: null,
      bio: "This is a fallback user. GitHub data could not be loaded.",
      publicRepos: 0,
      followers: 0,
      following: 0,
      createdAt: null,
      updatedAt: null,
      avatarUrl: "https://avatars.githubusercontent.com/u/0?v=4",
      htmlUrl: "https://github.com"
    }
  }
}