import { isSessionExist } from "@/utilities/isSessionExist";

const Home = async () => {
  const hasSession = await isSessionExist();

  if (!hasSession) {
    return <div className="w-full h-full flex justify-center items-center">로그인해주세요.</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">환영합니다!</div>
  )
}
export default Home