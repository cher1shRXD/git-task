'use client'

import { loadingStore } from '@/stores/loading';
import { usePathname, useRouter } from 'next/navigation'

export const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = loadingStore();

  return {
    push: (href: string) => {
      if(pathname !== href) setIsLoading(true);
      router.push(href);
    },
    replace: (href: string) => {
      if(pathname !== href) setIsLoading(true);
      router.replace(href);
    },
    back: () => {
      setIsLoading(true);
      router.back();
    }
  }
}
