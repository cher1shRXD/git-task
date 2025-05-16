import { createGitHubBranch } from "@/services/createBranch";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });
  const accessToken = token?.accessToken as string;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { owner, repo, baseBranch, newBranchName } = await req.json();

  if (!owner || !repo || !baseBranch || !newBranchName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await createGitHubBranch(
    accessToken,
    owner,
    repo,
    baseBranch,
    newBranchName
  );

  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
};
