import RepositoryItem from "@/components/RepositoryItem";
import { fetchOrgDetail } from "@/services/fetchOrgDetail";
import { GitHubOrgWithRepos } from "@/types/github/GitHubOrgWithRepos";
import { requestWithSession } from "@/utilities/requestWithSession"
import Image from "next/image";

const OrganizationPage = async ({
  params,
}: {
  params: Promise<{ organization: string }>;
}) => {
  const { organization } = await params;
  const { hasSession, data: org } = await requestWithSession<GitHubOrgWithRepos>(fetchOrgDetail, organization);

  if(!hasSession) {
    return <div className="w-full h-full flex justify-center items-center">로그인해주세요.</div>;
  }
  
  return (
    <div className="w-full p-12 flex flex-col gap-16">
      <div className="w-full flex gap-4 items-center">
        <Image src={org?.avatarUrl || "/assets/Symbol.svg"} alt="org image" width={1000} height={1000} priority className="w-32 h-32 rounded-xl" />
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-jetbrains">{org?.login}</p>
          <p className="text-gray-500">{org?.description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col border border-blue-300 rounded-xl overflow-hidden">
        <p className="text-xl font-jetbrains p-2 border-b border-blue-300 bg-blue-50">Repositories</p>
        <div className="w-full">
          {
            org?.repos.map((item, idx, arr) => (
              <RepositoryItem data={item} key={item.id} isLast={idx === arr.length - 1} />
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default OrganizationPage