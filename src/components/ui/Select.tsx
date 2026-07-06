"use client"

import { useState, useRef, useId } from "react"
import { cn } from "@/lib/utils"
import { Scrollbar } from "@/components/ui/Scrollbar"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  loading?: boolean
  searchable?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onClear?: () => void
  className?: string
}

export function Select({
  label,
  options,
  placeholder = "Selecione uma opção",
  error,
  hint,
  required,
  disabled,
  value,
  defaultValue = "",
  onChange,
  onClear,
  loading,
  searchable = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [search, setSearch] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue
  const selectedLabel = options.find((o) => o.value === currentValue)?.label ?? ""
  const hasValue = currentValue !== "" && !disabled

  const filtered = searchable && search.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  const inputId = `select-${uid}`
  const listId = `select-list-${uid}`
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined

  const labelColor = error ? "text-red-500" : open ? "text-green-600" : "text-gray-700"
  const borderClass = error
    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
    : open
    ? "border-green-500 ring-2 ring-green-200 ring-offset-1"
    : "border-gray-300 focus:border-green-500 focus:ring-green-200"

  function openDropdown() {
    if (disabled) return
    setSearch("")
    setOpen(true)
    setTimeout(() => searchRef.current?.focus(), 0)
  }

  function closeDropdown() {
    setOpen(false)
    setSearch("")
  }

  function selectOption(option: SelectOption) {
    if (!controlled) setInternalValue(option.value)
    onChange?.(option.value)
    closeDropdown()
  }

  function clear() {
    if (!controlled) setInternalValue("")
    onChange?.("")
    onClear?.()
  }

  function handleBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      closeDropdown()
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5" onBlur={handleBlur}>
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
        {/* trigger */}
        <input
          id={inputId}
          readOnly
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
          value={selectedLabel}
          placeholder={placeholder}
          onClick={() => open ? closeDropdown() : openDropdown()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open ? closeDropdown() : openDropdown() }
            if (e.key === "Escape") closeDropdown()
          }}
          className={cn(
            "w-full cursor-pointer rounded-md border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasValue ? "pr-14" : "pr-9",
            borderClass,
            className
          )}
        />

        {/* clear + chevron */}
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {hasValue && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Limpar seleção"
              onClick={(e) => { e.stopPropagation(); clear() }}
              className="pointer-events-auto rounded p-0.5 text-gray-400 transition-colors hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                "transition-transform duration-200",
                open ? "rotate-180" : "rotate-0",
                error ? "text-red-400" : open ? "text-green-500" : "text-gray-400"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          )}
        </div>

        {/* dropdown */}
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
            {searchable && (
              <div className="border-b border-gray-100 px-3 py-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar..."
                  onKeyDown={(e) => { if (e.key === "Escape") closeDropdown() }}
                  className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            )}

            <Scrollbar>
              <ul
                id={listId}
                role="listbox"
                aria-label={label}
                className="py-1"
              >
                {filtered.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-400">Nenhum resultado encontrado</li>
                ) : (
                  filtered.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={option.value === currentValue}
                      onMouseDown={(e) => { e.preventDefault(); selectOption(option) }}
                      className={cn(
                        "cursor-pointer px-3 py-2 text-sm transition-colors",
                        option.value === currentValue
                          ? "bg-green-50 font-medium text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </Scrollbar>
          </div>
        )}
      </div>

      {hint && !error && <p id={hintId} className="text-xs text-gray-500">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
