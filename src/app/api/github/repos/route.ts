import { GitHubBranch } from "@/types/github/GitHubBranch";
import { GitHubRepo } from "@/types/github/GitHubRepo";
import { RepoDetail } from "@/types/github/RepoDetail";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const parseLastPageFromLinkHeader = (linkHeader: string | undefined): number => {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const accessToken = token?.accessToken;
  const owner = req.nextUrl.searchParams.get("owner");
  const repo = req.nextUrl.searchParams.get("repo");

  if (!accessToken) {
    return NextResponse.json({ error: "Access token missing" }, { status: 401 });
  }

  if (!owner || !repo) {
    return NextResponse.json({ error: "Missing 'owner' or 'repo' query param" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };

  try {
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

    const repoDetail: RepoDetail = {
      ...repoData,
      branches: branchesData.map((branch) => ({
        name: branch.name,
        protected: branch.protected,
      })),
      commitCount,
    };

    return NextResponse.json({ repo: repoDetail });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || { error: "Failed to fetch repo/branches/commits" };
    return NextResponse.json(message, { status });
  }
}
