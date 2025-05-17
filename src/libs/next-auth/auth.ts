import GitHub from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { SessionWithToken } from "@/types/session/SessionWithToken";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user read:org repo",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as SessionWithToken).accessToken = token.accessToken as string;
      return session;
    },
  },
};