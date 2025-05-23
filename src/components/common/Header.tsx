"use client";

import { Github, Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import CustomLink from "./CustomLink";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) || [];

  return (
    <div className="w-full h-18 2xl:h-25 px-8 flex items-center justify-between">
      <div className="px-4 py-1 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 font-jetbrains flex items-center gap-2 self-end mb-3 text-gray-50">
        {segments.length > 0 ? segments.map((seg, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");

          return (
            <div key={href} className="flex items-center gap-2">
              <CustomLink href={href} className="hover:underline">
                {seg}
              </CustomLink>
              {idx !== segments.length - 1 && <span>/</span>}
            </div>
          );
        }) : <span>/</span>}
      </div>

      {status === "loading" ? (
        <Loader color="gray" className="animate-spin" />
      ) : (
        !session && (
          <button
            className="px-4 py-2 bg-github text-white rounded-lg flex items-center gap-1"
            onClick={() => signIn("github")}
          >
            <Github size={16} />
            <span>깃허브 로그인</span>
          </button>
        )
      )}
    </div>
  );
};

export default Header;
