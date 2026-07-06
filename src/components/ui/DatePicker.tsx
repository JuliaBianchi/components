"use client"

import { useState, useRef, useId } from "react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  label?: string
  hint?: string
  error?: string
  value?: string
  defaultValue?: string
  required?: boolean
  disabled?: boolean
  min?: string
  max?: string
  onChange?: (value: string) => void
  className?: string
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function DatePicker({
  label,
  hint,
  error,
  value,
  defaultValue = "",
  required,
  disabled,
  min,
  max,
  onChange,
  className,
}: DatePickerProps) {
  const uid = useId()
  const inputId = `datepicker-${uid}`
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined

  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue

  const today = new Date()
  const selected = currentValue ? new Date(currentValue + "T00:00:00") : null

  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth())

  const labelColor = error ? "text-red-500" : open ? "text-green-600" : "text-gray-700"
  const borderClass = error
    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
    : open
    ? "border-green-500 ring-2 ring-green-200 ring-offset-1"
    : "border-gray-300 focus:border-green-500 focus:ring-green-200"

  function selectDate(dateStr: string) {
    if (!controlled) setInternalValue(dateStr)
    onChange?.(dateStr)
    setOpen(false)
  }

  function clear() {
    if (!controlled) setInternalValue("")
    onChange?.("")
  }

  function handleBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const totalDays = daysInMonth(viewYear, viewMonth)

  const displayValue = selected
    ? selected.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    : ""

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-1.5", className)} onBlur={handleBlur}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", labelColor)}
        >
          {label}
          {required && <span className="text-xs font-normal text-gray-400">(obrigatório)</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          readOnly
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
          value={displayValue}
          placeholder="dd/mm/aaaa"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((prev) => !prev) }
            if (e.key === "Escape") setOpen(false)
          }}
          className={cn(
            "w-full cursor-pointer rounded-md border bg-white px-3 py-2 pr-16 text-sm text-gray-900 placeholder:text-gray-400",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            borderClass
          )}
        />

        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {currentValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Limpar data"
              onClick={(e) => { e.stopPropagation(); clear() }}
              className="pointer-events-auto rounded p-0.5 text-gray-400 transition-colors hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <span className={cn("transition-colors", error ? "text-red-400" : open ? "text-green-500" : "text-gray-400")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </span>
        </div>

        {open && (
          <div className="absolute z-10 mt-1 w-72 rounded-md border border-gray-200 bg-white p-3 shadow-md">
            {/* header */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <span className="text-sm font-medium text-gray-800">
                {MONTHS[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* weekdays */}
            <div className="mb-1 grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-1 text-center text-xs font-medium text-gray-400">{d}</div>
              ))}
            </div>

            {/* days */}
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}

              {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const isSelected = dateStr === currentValue
                const isToday = dateStr === toDateString(today)
                const isDisabled = (min && dateStr < min) || (max && dateStr > max)

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!!isDisabled}
                    onClick={() => selectDate(dateStr)}
                    className={cn(
                      "rounded-md py-1.5 text-sm transition-colors",
                      isSelected
                        ? "bg-green-500 font-medium text-white"
                        : isToday
                        ? "border border-green-400 text-green-600 hover:bg-green-50"
                        : "text-gray-700 hover:bg-gray-100",
                      isDisabled && "cursor-not-allowed opacity-30"
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {hint && !error && <p id={hintId} className="text-xs text-gray-500">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
