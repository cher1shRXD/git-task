import { GitHubBranch } from "@/types/github/GitHubBranch";
import { RepoDetail } from "@/types/github/RepoDetail";
import { parseLastPageFromLinkHeader } from "@/utilities/parseLastPageFromLinkHeader";
import axios from "axios";

export async function fetchGitHubRepoDetail(accessToken: string, owner: string, repo: string): Promise<RepoDetail> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };

  try{
    const { data: repoData } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    const { data: branchesData } = await axios.get<GitHubBranch[]>(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      { headers }
    );

    const commitsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers,
        params: {
          per_page: 1,
          sha: repoData.defaultBranch,
        },
      }
    );

    const commitCount = parseLastPageFromLinkHeader(commitsRes.headers.link);

    return {
      id: repoData.id,
      name: repoData.name,
      fullName: repoData.full_name,
      private: repoData.private,
      createdAt: repoData.created_at,
      defaultBranch: repoData.default_branch,
      description: repoData.description,
      forksCount: repoData.forks_count,
      language: repoData.language,
      stargazersCount: repoData.stargazers_count,
      updatedAt: repoData.updated_at,
      htmlUrl: repoData.html_url,
      owner: {
        login: repoData.owner.login,
        id: repoData.owner.id,
        avatarUrl: repoData.owner.avatar_url
      },
      branches: branchesData.map((branch) => ({
        name: branch.name,
        protected: branch.protected,
      })),
      commitCount,
    };
  }catch {
    return {
      id: -1,
      name: "Unknown",
      fullName: "Unknown/Unknown",
      private: false,
      createdAt: "",
      defaultBranch: "",
      description: "Failed to fetch repository data.",
      forksCount: 0,
      language: "N/A",
      stargazersCount: 0,
      updatedAt: "",
      htmlUrl: "",
      owner: {
        login: "unknown",
        id: -1,
        avatarUrl: "",
      },
      branches: [],
      commitCount: 0,
    };
  }  
}