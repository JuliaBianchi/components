"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface ScrollbarProps {
  children: React.ReactNode
  className?: string
  maxHeight?: string
}

export function Scrollbar({ children, className, maxHeight = "max-h-48" }: ScrollbarProps) {
  const uid = useId()
  const scrollId = `scrollbar-${uid}`

  return (
    <>
      <style>{`
        #${scrollId}::-webkit-scrollbar { width: 6px; }
        #${scrollId}::-webkit-scrollbar-button { display: none; height: 0; width: 0; }
        #${scrollId}::-webkit-scrollbar-track { background: transparent; }
        #${scrollId}::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 9999px; }
      `}</style>
      <div
        id={scrollId}
        className={cn("overflow-y-auto px-1", maxHeight, className)}
      >
        {children}
      </div>
    </>
  )
}
