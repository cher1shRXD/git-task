'use client'

import { usePathname, useRouter } from 'next/navigation'
import NProgress from 'nprogress'

export const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const startLoading = () => {
    NProgress.start()
  }

  return {
    push: (href: string) => {
      if(pathname !== href) startLoading();
      router.push(href);
    },
    replace: (href: string) => {
      if(pathname !== href)startLoading();
      router.replace(href);
    },
    back: () => {
      startLoading();
      router.back();
    }
  }
}
