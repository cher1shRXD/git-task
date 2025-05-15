import { getRepoLanguageColor } from "@/services/getRepoLanguageColor"
import { GitHubRepo } from "@/types/github/GitHubRepo"
import { Plug, Star } from "lucide-react";
import Link from "next/link";

const RepositoryItem = async ({ data, isLast }: { data: GitHubRepo, isLast: boolean }) => {
  const langColor = await getRepoLanguageColor(data.language);

  return (
    <Link href={`/${data.owner.login}/${data.name}`} className={`w-full ${!isLast ? "border-b" : ""} border-gray-200 p-3 flex flex-col gap-2`}>
      <div className="w-full flex items-center gap-2">
        <p>{data.name}</p>
        <span className="border border-blue-300 rounded-full px-2 bg-blue-50 text-gray-500 text-sm">{data.private ? "private" : "public"}</span>
      </div>
      <div className="w-full flex items-center gap-3">
        { data.language && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ background: langColor }} />
            <p>{data.language}</p>
          </div>
        )}
        <p className="flex items-center gap-0.5 text-gray-500"><Star size={14} />{data.stargazersCount}</p>
        <p className="flex items-center gap-0.5 text-gray-500"><Plug size={14} /> {data.forksCount}</p>
      </div>
    </Link>
  )
}

export default RepositoryItem