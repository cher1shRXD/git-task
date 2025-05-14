"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <div className="w-full h-25 px-8 flex items-center justify-between">
      <Image src="/imags/SymbolWithText.svg" alt="logo" width={848} height={291} className="w-40" />
      
      {
        status === "loading" ? <p>로딩 중...</p> : session ? 
          <Image onClick={() => signOut()} src={session.user?.image || "/images/SymbolWithText.svg"} alt="profile image" width={64} height={64} className="rounded-full cursor-pointer" /> : 
          <button onClick={() => signIn("github")}>깃허브 로그인</button>
      }
      
    </div>
  )
}

export default Header