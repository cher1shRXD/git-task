import { GitHubBranch } from "@/types/github/GitHubBranch";
import { GitHubRepo } from "@/types/github/GitHubRepo";
import { RepoDetail } from "@/types/github/RepoDetail";
import { parseLastPageFromLinkHeader } from "@/utilities/parseLastPageFromLinkHeader";
import axios from "axios";

export async function fetchGitHubRepoDetail(accessToken: string, owner: string, repo: string): Promise<RepoDetail> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };

  const { data: repoData } = await axios.get<GitHubRepo>(
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
    ...repoData,
    branches: branchesData.map((branch) => ({
      name: branch.name,
      protected: branch.protected,
    })),
    commitCount,
  };
}