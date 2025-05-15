import { fetchOrgsWithRepos } from "@/services/fetchOrgsWithRepos";
import OrganizationItem from "../OrganizationItem";
import Image from "next/image";
import { requestWithSession } from "@/utilities/requestWithSession";
import { GitHubOrgWithRepos } from "@/types/github/GitHubOrgWithRepos";

const Sidebar = async () => {
  const { hasSession, data: orgs } = await requestWithSession<GitHubOrgWithRepos[]>(fetchOrgsWithRepos);

  if(!hasSession) {
    return (
      <div className="w-100 h-full p-3">
        <div className="h-25 flex items-center pl-2">
          <Image src="/imags/SymbolWithText.svg" alt="logo" width={848} height={291} className="w-40" />
        </div>
        <p className="text-lg font-semibold text-primary font-jetbrains">Organizations</p>
        <div className="p-2">
          <p className="text-gray-500">로그인 후 이용해주세요.</p>
        </div>
      </div>
    ) 
  } 

  return (
    <div className="w-100 h-full p-3 pb-0 flex flex-col gap-4">
      <div className="h-25 flex items-center pl-2">
        <Image src="/imags/SymbolWithText.svg" alt="logo" width={848} height={291} className="w-40" />
      </div>
    
      <div className="p-2 flex-1 overflow-scroll">
        <div className="w-full flex flex-col gap-4">
          {
            orgs?.map((item) => (
              <OrganizationItem data={item} key={item.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar