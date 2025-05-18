"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginRequire = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <p className="text-2xl font-jetbrains">Welcome to</p>
      <Image src="/images/SymbolWithText.svg" alt="Logo" width={500} height={500} />
      <p className="text-lg font-jetbrains">Github로 로그인하고 Git-TASK 사용하기</p>
      <button
        className="px-4 py-2 bg-github text-white rounded-lg flex items-center gap-1"
        onClick={() => signIn("github")}
      >
        <Github size={16} />
        <span>깃허브 로그인</span>
      </button>
    </div>
  )
}

export default LoginRequire