"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {


  return (
    <button className="w-full py-2 rounded-lg bg-red-400 text-white cursor-pointer" onClick={() => signOut()}>로그아웃</button>
  )
}

export default LogoutButton