import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-col">
      데이터 불러오는 중...
      <Loader2 color="gray" className="animate-spin" size={40} />
    </div>
  )
}

export default Loader