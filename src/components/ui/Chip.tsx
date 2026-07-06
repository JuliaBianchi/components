"use client"

import { cn } from "@/lib/utils"

export type ChipShape = "round" | "square" | "rounded"
export type ChipVariant = "default" | "blue" | "green" | "yellow" | "red" | "purple"
export type ChipSize = "sm" | "md" | "lg"

interface ChipProps {
  children: React.ReactNode
  shape?: ChipShape
  variant?: ChipVariant
  size?: ChipSize
  onRemove?: () => void
  className?: string
}

const shapeClasses: Record<ChipShape, string> = {
  round:   "rounded-full",
  square:  "rounded-none",
  rounded: "rounded-md",
}

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-gray-100  text-gray-700",
  blue:    "bg-blue-100  text-blue-700",
  green:   "bg-green-100 text-green-700",
  yellow:  "bg-yellow-100 text-yellow-700",
  red:     "bg-red-100   text-red-700",
  purple:  "bg-purple-100 text-purple-700",
}

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
}

export function Chip({
  children,
  shape = "round",
  variant = "default",
  size = "md",
  onRemove,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium leading-none",
        shapeClasses[shape],
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remover chip"
          className={cn(
            "flex items-center justify-center opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-current",
            size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5",
            shape === "round" ? "rounded-full" : "rounded-sm"
          )}
        >
          <svg viewBox="0 0 12 12" fill="currentColor" className="h-full w-full">
            <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L6 4.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L7.06 6l2.72 2.72a.75.75 0 1 1-1.06 1.06L6 7.06 3.28 9.78a.75.75 0 0 1-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      )}
    </span>
  )
}
