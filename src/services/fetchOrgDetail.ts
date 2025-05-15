import axios from "axios";
import { GitHubRepo } from "@/types/github/GitHubRepo";
import { GitHubOrgWithRepos } from "@/types/github/GitHubOrgWithRepos";

export const fetchOrgDetail = async (
  accessToken: string,
  orgLogin: string
): Promise<GitHubOrgWithRepos> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const { data: org } = await axios.get(
      `https://api.github.com/orgs/${orgLogin}`,
      { headers }
    );

    const { data: repos } = await axios.get(
      `https://api.github.com/orgs/${orgLogin}/repos`,
      {
        headers,
        params: {
          per_page: 100,
        },
      }
    );

    return {
      id: org.id,
      login: org.login,
      url: org.url,
      avatarUrl: org.avatar_url,
      description: org.description,
      repos: repos.map((repo: any): GitHubRepo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        private: repo.private,
        createdAt: repo.created_at,
        defaultBranch: repo.default_branch,
        description: repo.description,
        forksCount: repo.forks_count,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
        owner: {
          login: repo.owner.login,
          id: repo.owner.id,
          avatarUrl: repo.owner.avatar_url,
        },
      })),
    };
  } catch (err: any) {
    console.error(`Error fetching org or repos for ${orgLogin}:`, err.message);
    return {
      id: -1,
      login: orgLogin,
      url: "",
      avatarUrl: "",
      description: "",
      repos: [],
      error: `Failed to fetch organization or repositories: ${err.message}`,
    };
  }
};
