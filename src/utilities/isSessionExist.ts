import { authOptions } from "@/libs/next-auth/auth"
import { getServerSession } from "next-auth"

export const isSessionExist = async () => {
  const session = await getServerSession(authOptions);

  if((session as any)?.accessToken) {
    return true;
  }

  return false;
}