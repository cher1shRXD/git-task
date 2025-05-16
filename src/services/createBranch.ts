import axios, { AxiosError } from "axios";

export const createGitHubBranch = async (
  accessToken: string,
  owner: string,
  repo: string,
  baseBranch: string,
  newBranchName: string,
): Promise<{ success: boolean; message: string }> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };

  try {
    const { data: baseRef } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`,
      { headers }
    );

    const baseSha = baseRef.object.sha;

    await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        ref: `refs/heads/${newBranchName}`,
        sha: baseSha,
      },
      { headers }
    );

    return {
      success: true,
      message: `Branch '${newBranchName}' created successfully.`,
    };
  } catch (err: unknown) {

    if ((err as AxiosError).response?.status === 422 && (err as AxiosError<{message: string}>).response?.data?.message?.includes("Reference already exists")) {
      return {
        success: false,
        message: `Branch '${newBranchName}' already exists.`,
      };
    }

    return {
      success: false,
      message: `Failed to create branch: ${(err as AxiosError).message}`,
    };
  }
};
