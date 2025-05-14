import { authOptions } from "@/libs/auth";
import { fetchOrgsWithRepos } from "@/services/fetchOrgsWithRepos";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return <div className="w-full h-full flex justify-center items-center">로그인해주세요.</div>;
  }

  const orgs = await fetchOrgsWithRepos(accessToken);

  console.log(orgs);

  return (
    <div className="w-full h-full flex justify-center items-center">환영합니다!</div>
  )
}
export default Home