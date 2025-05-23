'use client'

import { CustomLinkProps } from '@/types/props/CustomLinkProps'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={() => {
        if(pathname !== href) NProgress.start()
      }}
      className={className}
    >
      {children}
    </Link>
  )
}

export default CustomLink