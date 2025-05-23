import { fetchOrgsWithRepos } from "@/services/fetchOrgsWithRepos";
import OrganizationItem from "../OrganizationItem";
import Image from "next/image";
import { requestWithSession } from "@/utilities/requestWithSession";
import { fetchGitHubUser } from "@/services/fetchGitHubUser";
import LogoutButton from "./LogoutButton";
import CustomLink from "./CustomLink";

const Sidebar = async () => {
  const { hasSession, data: orgs } = await requestWithSession(fetchOrgsWithRepos);
  const { data: user } = await requestWithSession(fetchGitHubUser);

  if(!hasSession) {
    return (
      <div className="w-80 2xl:w-100 h-full p-3">
        <CustomLink href="/" className="h-25 flex items-center pl-4">
          <Image src="/images/SymbolWithText.svg" alt="logo" width={848} height={291} className="w-40" priority />
        </CustomLink>
        <p className="text-lg font-semibold text-primary font-jetbrains">Organizations</p>
        <div className="p-2">
          <p className="text-gray-500">로그인 후 이용해주세요.</p>
        </div>
      </div>
    ) 
  } 

  return (
    <div className="w-80 2xl:w-100 h-full p-3 flex flex-col gap-4">
      <CustomLink href="/" className="h-25 flex items-center pl-4">
        <Image src="/images/SymbolWithText.svg" alt="logo" width={848} height={291} className="w-40" priority />
      </CustomLink>
    
      <div className="p-2 flex-1 overflow-scroll">
        <div className="w-full flex flex-col gap-4">
          {
            orgs?.map((item) => (
              <OrganizationItem data={item} key={item.id} />
            ))
          }
        </div>
      </div>

      <div className="w-full flex flex-col p-2 gap-4 shadow-xl rounded-lg">
        <div className="w-full flex items-center gap-2">
          <Image src={user?.avatarUrl || "/images/Symbol.svg"} alt="profile" width={64} height={64} className="rounded-full" priority />
          <div className="w-full flex flex-col gap-0.5">
            <p className="font-jetbrains text-xl">{user?.login}</p>
            {
              user?.email && <p className="text-sm text-gray-500">{user?.email}</p>
            }
            <p className="text-sm text-gray-500">{user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar