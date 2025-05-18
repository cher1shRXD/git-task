"use client";

import Link from "next/link";
import { Github, Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full h-25 px-8 flex items-center justify-between">
      <div className="px-4 py-1 rounded-lg bg-gradient-to-br from-blue-200 to-purple-200 font-jetbrains flex items-center gap-2 self-end mb-3">
        {segments.length > 0 ? segments.map((seg, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");

          return (
            <div key={href} className="flex items-center gap-2">
              <Link href={href} className="hover:underline">
                {seg}
              </Link>
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
