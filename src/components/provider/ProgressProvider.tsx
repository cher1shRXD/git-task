'use client'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ProgressProvider = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname])

  return null
}

export default ProgressProvider