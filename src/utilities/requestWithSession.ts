import { authOptions } from "@/libs/next-auth/auth";
import { getServerSession } from "next-auth";

type CallbackSingle<T> = (accessToken: string) => Promise<T>;
type CallbackWithOrg<T> = (accessToken: string, orgLogin: string) => Promise<T>;
type CallbackWithRepo<T> = (accessToken: string, orgLogin: string, repoName: string) => Promise<T>;

export async function requestWithSession<T>(
  callback: CallbackSingle<T> | CallbackWithOrg<T> | CallbackWithRepo<T>,
  orgLogin?: string,
  repoName?: string,
): Promise<{ hasSession: boolean; data: T | null }> {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return {
      hasSession: false,
      data: null,
    };
  }

  const data = repoName && orgLogin
    ? await (callback as CallbackWithRepo<T>)(accessToken, orgLogin, repoName)
    : orgLogin ? await (callback as CallbackWithOrg<T>)(accessToken, orgLogin)
    : await (callback as CallbackSingle<T>)(accessToken);

  return {
    hasSession: true,
    data,
  };
}
