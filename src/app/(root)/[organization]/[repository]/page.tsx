import ChartController from "@/components/chart/ChartController";
import LoginRequire from "@/components/common/LoginRequire";
import NotFound from "@/components/common/NotFound";
import { fetchGitHubRepoDetail } from "@/services/fetchRepoDetail";
import { getRepoLanguageColor } from "@/services/getRepoLanguageColor";
import { getScheduleData } from "@/services/getScheduleData";
import { parseDate } from "@/utilities/parseDate";
import { requestWithSession } from "@/utilities/requestWithSession";
import { Plug, Star } from "lucide-react";


const RepositoryPage = async ({
  params,
}: {
  params: Promise<{ organization: string, repository: string }>;
}) => {
  const { organization, repository } = await params;
  const { hasSession, data: repo } = await requestWithSession(fetchGitHubRepoDetail, organization, repository);
  const { data: schedule } = await requestWithSession(getScheduleData, repo?.fullName || "");
  console.log(schedule);

  if(!hasSession) {
    return <LoginRequire />;
  }

  if(repo?.id === -1) {
    return <NotFound />
  }

  const langColor = await getRepoLanguageColor(repo?.language || null);

  return (
    <div className="w-full h-full p-8 flex flex-col gap-16 pb-20">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <p className="text-3xl font-jetbrains">{repo?.name}</p>
          <span className="border border-blue-300 rounded-full px-2 bg-blue-50 text-gray-500 text-sm">{repo?.private ? "private" : "public"}</span>
        </div>
      </div>
      <div className="w-full h-full flex items-start">
        <div className="w-[calc(100%-320px)] 2xl:w-[calc(100%-400px)]">
          {
            schedule ? 
              <ChartController schedule={schedule} ownerName={repo?.owner.login} repoName={repo?.name} defaultBranch={repo?.defaultBranch} branches={repo?.branches || []} /> :
              <p>로딩중...</p>
          }
          
        </div>
        <div className="w-80 2xl:w-100 h-full flex flex-col gap-12 border-l border-gray-300 text-sm 2xl:text-base">
          <div className="w-full flex flex-col gap-2 items-start pl-6 font-jetbrains bg-white">
            <p className="text-lg text-primary">Repository Info</p>
            <p className={`w-full py-2 border-b mb-4 border-gray-300 ${repo?.description ? "" : "text-gray-400"}`}>{repo?.description || "No Descriptions..."}</p>
            { repo?.language && (
              <div className="flex items-center gap-1">
                <p>Most Used: </p>
                <span className="w-3 h-3 rounded-full" style={{ background: langColor }} />
                <p>{repo?.language}</p>
              </div>
            )}
            <p className="flex items-center gap-0.5">Stars:<Star size={14} />{repo?.stargazersCount}</p>
            <p className="flex items-center gap-0.5">Forks:<Plug size={14} /> {repo?.forksCount}</p>
            <p>total branches: {repo?.branches.length || 0}</p>
            <p>default branch: {repo?.defaultBranch}</p>
            <p>total commits: {repo?.commitCount || 0}</p>
            <p>Created At: {repo && parseDate(repo?.createdAt)}</p>
            <p>Modified At: {repo && parseDate(repo?.updatedAt)}</p>
          </div>
          <div className="w-full flex flex-col gap-2 items-start pl-6 font-jetbrains bg-white">
            <p className="text-lg text-primary">Web Hooks</p>
            <p className="text-sm">settings {"->"} Webhooks {"->"} Add webhook</p>
            <p className="w-full text-sm">Let me select individual events <br />{"->"} Pull reqeusts 선택 (필수)</p>
            <div className="w-full rounded-lg overflow-hidden">
              <p className="p-1 px-2 text-sm text-gray-500 bg-gray-100 border border-gray-300 border-b-0 overflow-hidden rounded-t-lg">Payload URL</p>
              <input type="text" value="https://git-task.site/api/github/web-hooks" disabled className="w-full p-2 bg-black text-white" />
            </div>
            <p className="w-full text-sm text-end">깃허브 레포지토리에 웹 훅을 등록해주세요. <br />웹 훅을 등록해야 완료한 작업이 체크됩니다.</p>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default RepositoryPage;