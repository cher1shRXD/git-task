import axios, { AxiosError } from "axios";
import { GitHubOrgWithRepos } from "@/types/github/GitHubOrgWithRepos";
import { GitHubRepo } from "@/types/github/GitHubRepo";

export const fetchOrgsWithRepos = async (accessToken: string): Promise<GitHubOrgWithRepos[]> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  const { data: orgs } = await axios.get("https://api.github.com/user/orgs", { headers });

  const orgsWithRepos: GitHubOrgWithRepos[] = await Promise.all(
    orgs.map(async (org: any): Promise<GitHubOrgWithRepos> => {
      try {
        const { data: repos } = await axios.get(
          `https://api.github.com/orgs/${org.login}/repos`,
          {
            headers,
            params: {
              per_page: 100
            }
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
              avatarUrl: repo.owner.avatar_url
            },
          })),
        };
      } catch (err: unknown) {
        console.error(`Error fetching repos for ${org.login}:`, (err as AxiosError).message);
        return {
          id: org.id,
          login: org.login,
          url: org.url,
          avatarUrl: org.avatar_url,
          description: "",
          repos: [],
          error: `Failed to fetch repositories: ${(err as AxiosError).message}`
        };
      }
    })
  );

  return orgsWithRepos;
}
