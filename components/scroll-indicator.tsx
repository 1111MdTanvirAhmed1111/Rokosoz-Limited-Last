"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import type React from "react"

// Extend Window interface to include our custom function
declare global {
  interface Window {
    handleScrollIndicatorClick?: (progress: number) => void
  }
}

interface ScrollIndicatorProps {
  progress: number
}

export default function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  const isMobile = useIsMobile()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.handleScrollIndicatorClick) return

    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickProgress = clickX / rect.width

    window.handleScrollIndicatorClick(clickProgress)
  }

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white/20 cursor-pointer z-50 transition-all duration-200"
      style={{ height: isMobile ? "6px" : "2px" }}
      onClick={handleClick}
    >
      <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}
