"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  label?: string
  description?: string
  error?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Checkbox({
  label,
  description,
  error,
  checked,
  defaultChecked,
  disabled,
  required,
  onChange,
  className,
}: CheckboxProps) {
  const uid = useId()
  const checkboxId = `checkbox-${uid}`
  const errorId = error ? `${checkboxId}-error` : undefined

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-start gap-3",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={errorId}
          onChange={(e) => onChange?.(e.target.checked)}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border bg-white transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-1",
            "checked:border-green-500 checked:bg-green-500",
            "disabled:cursor-not-allowed",
            error ? "border-red-400" : "border-gray-300"
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className={cn("text-sm font-medium", error ? "text-red-500" : "text-gray-700")}>
                {label}
                {required && <span className="ml-1 text-xs font-normal text-gray-400">(obrigatório)</span>}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </label>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
