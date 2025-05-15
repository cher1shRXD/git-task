import { authOptions } from "@/libs/next-auth/auth";
import { fetchOrgsWithRepos } from "@/services/fetchOrgsWithRepos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = (session as any)?.accessToken;

    if (!accessToken) {
      return NextResponse.json({
        error: "Authentication token not found",
        message: "Please sign in again"
      }, { status: 401 });
    }

    const orgsWithRepos = await fetchOrgsWithRepos(accessToken);
    return NextResponse.json(orgsWithRepos);
  } catch (error: any) {
    console.error("API route error:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data || {
      error: "Failed to fetch GitHub data",
      details: error.message
    };
    return NextResponse.json(message, { status });
  }
}
