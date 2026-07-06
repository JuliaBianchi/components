"use client"

import { useState, useRef, useId } from "react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  value?: string | [string, string]
  defaultValue?: string | [string, string]
  onChange?: (value: string | [string, string]) => void
  className?: string
}

function formatTime(h: number, m: number) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function parseTime(value: string): [number, number] {
  const [h = "0", m = "0"] = value.split(":")
  return [parseInt(h), parseInt(m)]
}

interface StepperProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}

function Stepper({ value, min, max, step = 1, onChange }: StepperProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function increment() {
    onChange(value + step > max ? min : value + step)
  }
  function decrement() {
    onChange(value - step < min ? max : value - step)
  }

  function startEditing() {
    setDraft(String(value).padStart(2, "0"))
    setEditing(true)
    setTimeout(() => { inputRef.current?.select() }, 0)
  }

  function applyValue(raw: string, snap = false) {
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed))
      const final = snap && step > 1 ? Math.round(clamped / step) * step : clamped
      onChange(Math.min(max, final))
    }
  }

  function commitEdit() {
    applyValue(draft, true)
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commitEdit()
    if (e.key === "Escape") setEditing(false)
    if (e.key === "ArrowUp") { e.preventDefault(); increment() }
    if (e.key === "ArrowDown") { e.preventDefault(); decrement() }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={increment}
        className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      {editing ? (
        <input
          ref={inputRef}
          type="number"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); applyValue(e.target.value) }}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="w-10 rounded border border-green-400 bg-white text-center text-xl font-semibold tabular-nums text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      ) : (
        <span
          onClick={startEditing}
          className="w-10 cursor-text select-none rounded text-center text-xl font-semibold tabular-nums text-gray-800 hover:bg-gray-100"
        >
          {String(value).padStart(2, "0")}
        </span>
      )}

      <button
        type="button"
        onClick={decrement}
        className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}

interface ClockPanelProps {
  value: string
  onChange: (v: string) => void
  label: string
}

function ClockPanel({ value, onChange, label }: ClockPanelProps) {
  const [h, m] = parseTime(value)

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <div className="flex items-center gap-2">
        <Stepper value={h} min={0} max={23} onChange={(v) => onChange(formatTime(v, m))} />
        <span className="mb-0.5 text-xl font-semibold text-gray-300">:</span>
        <Stepper value={m} min={0} max={59} step={1} onChange={(v) => onChange(formatTime(h, v))} />
      </div>
    </div>
  )
}

export function TimePicker({
  label,
  hint,
  error,
  required,
  disabled,
  multiple = false,
  value,
  defaultValue,
  onChange,
  className,
}: TimePickerProps) {
  const uid = useId()
  const inputId = `timepicker-${uid}`
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined
  const containerRef = useRef<HTMLDivElement>(null)

  const defaultSingle = multiple ? "" : (defaultValue as string) ?? ""
  const defaultRange: [string, string] = multiple
    ? ((defaultValue as [string, string]) ?? ["", ""])
    : ["", ""]

  const [open, setOpen] = useState(false)
  const [internalSingle, setInternalSingle] = useState(defaultSingle)
  const [internalRange, setInternalRange] = useState<[string, string]>(defaultRange)

  const controlled = value !== undefined
  const currentSingle = controlled ? (value as string) : internalSingle
  const currentRange = controlled ? (value as [string, string]) : internalRange

  const displayValue = multiple
    ? currentRange[0] && currentRange[1]
      ? `${currentRange[0]} — ${currentRange[1]}`
      : currentRange[0] || currentRange[1] || ""
    : currentSingle

  const hasValue = displayValue !== ""

  const labelColor = error ? "text-red-500" : open ? "text-green-600" : "text-gray-700"
  const borderClass = error
    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
    : open
    ? "border-green-500 ring-2 ring-green-200 ring-offset-1"
    : "border-gray-300 focus:border-green-500 focus:ring-green-200"

  function handleSingleChange(v: string) {
    if (!controlled) setInternalSingle(v)
    onChange?.(v)
  }

  function handleRangeChange(index: 0 | 1, v: string) {
    const next: [string, string] = [...currentRange] as [string, string]
    next[index] = v
    if (!controlled) setInternalRange(next)
    onChange?.(next)
  }

  function clear() {
    if (!controlled) {
      setInternalSingle("")
      setInternalRange(["", ""])
    }
    onChange?.(multiple ? ["", ""] : "")
  }

  function handleBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

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
          placeholder={multiple ? "00:00 — 00:00" : "00:00"}
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
          {hasValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Limpar horário"
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
        </div>

        {open && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className={cn(
            "absolute z-10 mt-1 rounded-md border border-gray-200 bg-white p-4 shadow-md",
            multiple ? "w-80" : "w-36"
          )}>
            {multiple ? (
              <div className="flex items-center gap-8">
                <ClockPanel
                  label="Início"
                  value={currentRange[0] || "00:00"}
                  onChange={(v) => handleRangeChange(0, v)}
                />
                <div className="h-16 w-px self-center bg-gray-100" />
                <ClockPanel
                  label="Fim"
                  value={currentRange[1] || "00:00"}
                  onChange={(v) => handleRangeChange(1, v)}
                />
              </div>
            ) : (
              <ClockPanel
                label="Horário"
                value={currentSingle || "00:00"}
                onChange={handleSingleChange}
              />
            )}
          </div>
        )}
      </div>

      {hint && !error && <p id={hintId} className="text-xs text-gray-500">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
