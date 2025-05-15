"use client";

import { GitHubOrgWithRepos } from "@/types/github/GitHubOrgWithRepos";
import { ChevronDown, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrganizationItem = ({ data }: { data: GitHubOrgWithRepos }) => {
  const [isOpened, setIsOpened] = useState(true);
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex items-center justify-between">
        <Link href={`/${data.login}`} className="text-lg font-medium hover:text-blue-600 transition-colors">{data.login}</Link>
        {
          isOpened ? <Minus onClick={() => setIsOpened(false)} className="cursor-pointer" /> : <ChevronDown onClick={() => setIsOpened(true)} className="cursor-pointer" />
        }
      </div>
      {
        isOpened && (
          <div className="w-full p-1 pt-2">
            {
              data.repos.map((item, idx, arr) => (
                <p 
                  className={`
                    px-3 py-0.5 ${idx === 0 ? "rounded-t-lg pt-3" : idx === arr.length - 1 ? "rounded-b-lg pb-3" : ""} 
                    hover:rounded hover:scale-105 hover:bg-primary transition-all cursor-pointer hover:text-white
                    hover:py-3
                  `} 
                  key={item.id}
                  onClick={() => router.push(`/${data.login}/${item.name}`)}
                >
                  {item.name}
                </p>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default OrganizationItem