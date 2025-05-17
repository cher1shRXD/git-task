"use client";

import { Github, Loader } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <div className="w-full h-25 px-8 flex items-center justify-between">
      <div></div>
      {
        status === "loading" ? <Loader color="gray" className="animate-spin" /> : !session && 
          <button className="px-4 py-2 bg-github text-white rounded-lg flex items-center gap-1 cursor-pointer" onClick={() => signIn("github")}>
            <Github size={16} />
            <p>깃허브 로그인</p>
          </button>
      }
      
    </div>
  )
}

export default Header