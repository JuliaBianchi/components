"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const components = [
  { label: "Input", href: "/test/input" },
  { label: "Select", href: "/test/select" },
  { label: "Checkbox", href: "/test/checkbox" },
  { label: "Switch", href: "/test/switch" },
  { label: "DatePicker", href: "/test/datepicker" },
  { label: "TimePicker", href: "/test/timepicker" },
  { label: "CurrencyInput", href: "/test/currency" },
  { label: "SideMenu", href: "/test/sidemenu" },
  { label: "AnimatedList", href: "/test/animatedlist" },
  { label: "Chip",     href: "/test/chip" },
  { label: "Timeline", href: "/test/timeline" },
  { label: "Tabs",     href: "/test/tabs" },
  { label: "Table",    href: "/test/table" },
]

export default function TestLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white px-4 py-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Componentes
        </p>
        <nav className="flex flex-col gap-1">
          {components.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-visible px-10 py-8">{children}</main>
    </div>
  )
}
