"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Logo = () => {
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => router.push("/")}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`text-3xl font-bold text-white transition-all duration-200 ease-out hover:scale-105 active:scale-95 rounded-lg px-2 py-1 cursor-pointer ${
          isPressed ? 'scale-95' : ''
        }`}
        aria-label="Go to homepage"
      >
        <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
          EnvoMag
        </span>
      </button>
    </div>
  )
}

export default Logo

