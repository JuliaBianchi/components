"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
  label?: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({
  label,
  description,
  checked,
  defaultChecked,
  disabled,
  onChange,
  className,
}: SwitchProps) {
  const uid = useId()
  const switchId = `switch-${uid}`

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            "h-5 w-9 rounded-full border-2 border-transparent transition-colors duration-200",
            "bg-gray-200 peer-checked:bg-green-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-green-200 peer-focus-visible:ring-offset-1",
            "peer-disabled:cursor-not-allowed"
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm",
            "transition-transform duration-200",
            "peer-checked:translate-x-4"
          )}
          style={{ pointerEvents: "none" }}
        />
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </label>
  )
}
