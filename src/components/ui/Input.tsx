"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-")
    const errorId = error ? `${inputId}-error` : undefined
    const hintId = hint ? `${inputId}-hint` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined

    const labelColor = error ? "text-red-500" : focused ? "text-green-600" : "text-gray-700"

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", labelColor)}
          >
            {label}
            {props.required && (
              <span className="text-xs font-normal text-gray-400">(obrigatório)</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onFocus={(e) => { setFocused(true); onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:border-green-500 focus:ring-green-200",
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-xs text-gray-500">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
