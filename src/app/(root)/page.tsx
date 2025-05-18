import LoginRequire from "@/components/common/LoginRequire";
import { isSessionExist } from "@/utilities/isSessionExist";
import Image from "next/image";

const Home = async () => {
  const hasSession = await isSessionExist();

  if (!hasSession) {
    return <LoginRequire />;
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <p className="text-2xl font-jetbrains">Welcome to</p>
      <Image src="/images/SymbolWithText.svg" alt="Logo" width={500} height={500} />
      <p className="text-lg font-jetbrains">손 쉬운 개발 일정 관리</p>
    </div>
  )
}
export default Home