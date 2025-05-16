import axios from "axios"

export const useCreateBranch = () => {
  const createBranch = async (owner: string, repo: string, baseBranch: string, newBranchName: string) => {
    const { data } = await axios.post('/api/github/branch', {
      owner,
      repo,
      baseBranch,
      newBranchName
    }, { withCredentials: true });

    return data;
  }

  return createBranch;
}