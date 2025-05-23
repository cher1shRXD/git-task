"use client";

import Image from "next/image";
import CustomLink from "./CustomLink";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <p className="text-2xl font-jetbrains">404 NotFound</p>
      <Image src="/images/SymbolWithText.svg" alt="Logo" width={500} height={500} />
      <p className="text-lg font-jetbrains">존재하지 않는 올가니제이션 또는 레포지토리입니다.</p>
      <CustomLink href="/" className="px-4 p-2 bg-gray-100 rounded-lg">메인으로</CustomLink>
    </div>
  )
}

export default NotFound