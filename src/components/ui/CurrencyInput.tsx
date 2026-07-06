"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/utils"

interface CurrencyInputProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  className?: string
}

function formatDisplay(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function CurrencyInput({
  label,
  hint,
  error,
  required,
  disabled,
  value,
  defaultValue = 0,
  onChange,
  className,
}: CurrencyInputProps) {
  const uid = useId()
  const inputId = `currency-${uid}`
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined

  const [focused, setFocused] = useState(false)
  const [internalCents, setInternalCents] = useState(Math.trunc((defaultValue ?? 0) * 100))

  const controlled = value !== undefined
  const currentCents = controlled ? Math.trunc((value ?? 0) * 100) : internalCents

  const labelColor = error ? "text-red-500" : focused ? "text-green-600" : "text-gray-700"
  const borderClass = error
    ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-300"
    : focused
    ? "border-green-500 ring-2 ring-green-200 ring-offset-1"
    : "border-gray-300"

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "")
    const cents = digits === "" ? 0 : parseInt(digits, 10)
    if (!controlled) setInternalCents(cents)
    onChange?.(cents / 100)
  }

  function handleClear() {
    if (!controlled) setInternalCents(0)
    onChange?.(0)
  }

  const hasValue = currentCents > 0 && !disabled

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", labelColor)}
        >
          {label}
          {required && <span className="text-xs font-medium text-gray-500">(obrigatório)</span>}
        </label>
      )}

      <div className={cn(
        "flex items-center rounded-md border bg-white transition-colors",
        borderClass,
        disabled && "cursor-not-allowed opacity-50"
      )}>
        <span className={cn(
          "select-none pl-3 text-sm font-medium transition-colors",
          error ? "text-red-400" : focused ? "text-green-600" : "text-gray-700"
        )}>
          R$
        </span>

        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          value={formatDisplay(currentCents)}
          onChange={handleChange}
          onFocus={(e) => { setFocused(true); const el = e.target; setTimeout(() => { const len = el.value.length; el.setSelectionRange(len, len) }, 0) }}
          onBlur={() => setFocused(false)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-right text-sm tabular-nums text-gray-900 focus:outline-none disabled:cursor-not-allowed"
        />

        {hasValue && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Limpar valor"
            onClick={handleClear}
            className="px-2 text-gray-400 transition-colors hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {hint && !error && <p id={hintId} className="text-xs text-gray-500">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
