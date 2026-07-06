import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Converte string no formato brasileiro ("1.234,56") para float (1234.56). */
export function parseFloat(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".")
  return Number(normalized)
}
