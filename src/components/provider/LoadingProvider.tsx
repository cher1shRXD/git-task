'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { loadingStore } from '@/stores/loading'
import Loader from '../common/Loader'

const ProgressProvider = () => {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = loadingStore();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname])

  if(isLoading) return (
    <div className='w-full h-screen z-[10000] fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]'>
      <Loader />
    </div>
  )

  return null
}

export default ProgressProvider