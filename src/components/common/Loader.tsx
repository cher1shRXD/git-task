import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-col">
      <div className="w-full flex justify-center py-2">
        <div className="flex py-4 space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-bounce [animation-delay:0.15s]"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader