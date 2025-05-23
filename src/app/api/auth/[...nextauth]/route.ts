import { authOptions } from "@/libs/next-auth/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };