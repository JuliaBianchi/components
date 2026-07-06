"use client"

import { useState, useId } from "react"
import { cn } from "@/lib/utils"

interface Level2Item {
  label: string
  href: string
}

interface Level1Item {
  label: string
  href?: string
  children?: Level2Item[]
}

interface Module {
  label: string
  icon?: React.ReactNode
  children: Level1Item[]
}

interface User {
  name: string
  email: string
  avatarUrl?: string
}

interface SideMenuProps {
  modules: Module[]
  user: User
  activeHref?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
  className?: string
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 transition-transform duration-200", open ? "rotate-180" : "rotate-0")}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Avatar({ user }: { user: User }) {
  if (user.avatarUrl) {
    return <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
  }
  const initials = user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
      {initials}
    </div>
  )
}

export function SideMenu({ modules, user, activeHref, onNavigate, onLogout, className }: SideMenuProps) {
  const navId = `sidemenu-nav-${useId().replace(/:/g, "")}`
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState("")
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({})
  const [openLevel1, setOpenLevel1] = useState<Record<string, boolean>>({})

  const query = search.toLowerCase().trim()

  function matches(texts: string[]) {
    return !query || texts.some((t) => t.toLowerCase().includes(query))
  }

  function toggleModule(i: number) {
    setOpenModules((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  function toggleLevel1(key: string) {
    setOpenLevel1((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside className={cn(
      "relative flex shrink-0 flex-col rounded-xl border border-gray-200 bg-white shadow-xl m-4 h-[calc(100vh-2rem)] p-2 transition-all duration-500",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      {/* toggle button — top right corner */}
      <div className={cn("flex", collapsed ? "justify-center" : "justify-end")}>
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="flex items-center justify-center rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* logo */}
      <div className={cn("flex items-center pt-5 pb-12", collapsed ? "justify-center" : "gap-2")}>
        <svg className="h-7 w-7 shrink-0" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.745 7.19a15.553 15.553 0 0 0-8.829 2.722L8.56 6.296A21.72 21.72 0 0 1 22.745 1.5C34.62 1.5 44.245 11.126 44.245 23c0 11.875-9.625 21.5-21.5 21.5A21.721 21.721 0 0 1 8.56 39.705l5.356-3.617a15.593 15.593 0 0 0 8.829 2.723c8.608 0 15.582-6.974 15.582-15.582 0-8.607-6.974-15.03-15.582-15.03Z" fill="#D97757"/>
          <path d="m12.037 32.696-6.48 4.376A21.538 21.538 0 0 1 1.755 23c0-5.25 1.879-10.062 4.987-13.8l6.295 4.253A15.538 15.538 0 0 0 7.255 23c0 3.769 1.338 7.226 3.554 9.924l1.228-.228Z" fill="#D97757"/>
        </svg>
        {!collapsed && <span className="sidemenu-fade text-base font-semibold text-gray-900">Claude</span>}
      </div>

      {/* search */}
      {!collapsed && (
        <div className="sidemenu-fade pb-10">
          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar..."
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="shrink-0 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* title */}
      {!collapsed && <span className="sidemenu-fade pb-2 text-sm font-bold text-gray-500">Menu</span>}

      {/* modules */}
      <style>{`
        #${navId}::-webkit-scrollbar { width: 6px; }
        #${navId}::-webkit-scrollbar-button { display: none; height: 0; width: 0; }
        #${navId}::-webkit-scrollbar-track { background: transparent; }
        #${navId}::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 9999px; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sidemenu-slide { animation: slideDown 0.4s ease forwards; }
        .sidemenu-fade  { animation: fadeIn 0.4s ease forwards; }
      `}</style>
      <nav id={navId} className={cn("flex-1 overflow-y-auto py-2", !collapsed && "pr-4")}>
        {modules.map((mod, mi) => {
          const modOpen = !!openModules[mi] || !!query

          const filteredL1 = mod.children.filter((l1) => {
            if (!query) return true
            if (matches([mod.label, l1.label])) return true
            return l1.children?.some((l2) => matches([l2.label]))
          })

          if (query && filteredL1.length === 0) return null

          const modActive = mod.children.some((l1) =>
            l1.href === activeHref || l1.children?.some((l2) => l2.href === activeHref)
          )

          return (
            <div key={mi} className="mb-1">
              <button
                type="button"
                onClick={() => !collapsed && !query && toggleModule(mi)}
                title={collapsed ? mod.label : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors",
                  collapsed ? "w-full justify-center px-0" : "w-full px-3 text-left",
                  modActive ? "bg-green-50 text-green-700 hover:bg-green-100" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {mod.icon && <span className={cn("shrink-0", modActive ? "text-green-600" : "text-gray-700")}>{mod.icon}</span>}
                {!collapsed && <span className="flex-1 truncate">{mod.label}</span>}
                {!collapsed && !query && <ChevronIcon open={modOpen} />}
              </button>

              {!collapsed && modOpen && (
                <div className="sidemenu-slide ml-3 mt-0.5 pl-2">
                  {filteredL1.map((l1, l1i) => {
                    const l1Key = `${mi}-${l1i}`
                    const hasChildren = !!(l1.children && l1.children.length > 0)
                    const l1Open = !!openLevel1[l1Key] || !!query
                    const filteredL2 = hasChildren
                      ? l1.children!.filter((l2) => !query || matches([mod.label, l1.label, l2.label]))
                      : []
                    const l1Active = l1.href === activeHref || l1.children?.some((l2) => l2.href === activeHref)

                    return (
                      <div key={l1i} className="mb-1">
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => !query && toggleLevel1(l1Key)}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                              l1Active ? "bg-green-50 font-medium text-green-700 hover:bg-green-100" : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            <span className="flex-1 truncate">{l1.label}</span>
                            {!query && <ChevronIcon open={l1Open} />}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => l1.href && onNavigate?.(l1.href)}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                              activeHref === l1.href ? "bg-green-50 font-medium text-green-700" : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {l1.label}
                          </button>
                        )}

                        {hasChildren && l1Open && (
                          <div className="sidemenu-slide ml-3 mt-1 pl-2 space-y-1">
                            {filteredL2.map((l2, l2i) => (
                              <button
                                key={l2i}
                                type="button"
                                onClick={() => onNavigate?.(l2.href)}
                                className={cn(
                                  "flex w-full items-center rounded-md px-3 py-1.5 text-left text-xs transition-colors",
                                  activeHref === l2.href ? "bg-green-50 font-medium text-green-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                )}
                              >
                                {l2.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* user + logout */}
      <div className="border-t border-gray-100 pt-3">
        <div className={cn("flex items-center rounded-md py-2", collapsed ? "justify-center" : "gap-3")}>
          <Avatar user={user} />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">{user.name}</p>
              <p className="truncate text-xs text-gray-400">{user.email}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onLogout}
          title={collapsed ? "Sair" : undefined}
          className={cn(
            "mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600",
            collapsed && "justify-center px-0"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          {!collapsed && "Sair"}
        </button>
      </div>
    </aside>
  )
}
