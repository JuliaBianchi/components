"use client"

// ---------------------------------------------------------------------------
// Usando Tabs para filtrar uma tabela com dados dinâmicos (fetch por tab)
// ---------------------------------------------------------------------------
//
// O padrão correto é usar o modo controlado (activeTab + onChange) e manter
// o estado da tab e dos dados da tabela na página. O componente Tabs só
// gerencia qual tab está selecionada — a busca acontece fora dele.
//
// Passe content={null} para cada tab e renderize a tabela separadamente:
//
//   "use client"
//   import { useState, useEffect } from "react"
//   import { Tabs } from "@/components/ui/Tabs"
//
//   const ENDPOINTS: Record<string, string> = {
//     ativos:    "/api/usuarios?status=ativo",
//     inativos:  "/api/usuarios?status=inativo",
//     pendentes: "/api/usuarios?status=pendente",
//   }
//
//   const tabs = [
//     { id: "ativos",    label: "Ativos",    content: null },
//     { id: "inativos",  label: "Inativos",  content: null },
//     { id: "pendentes", label: "Pendentes", content: null },
//   ]
//
//   export default function Page() {
//     const [activeTab, setActiveTab] = useState("ativos")
//     const [data, setData]           = useState([])
//     const [loading, setLoading]     = useState(false)
//
//     useEffect(() => {
//       setLoading(true)
//       fetch(ENDPOINTS[activeTab])
//         .then((res) => res.json())
//         .then(setData)
//         .finally(() => setLoading(false))
//     }, [activeTab])                    // ← re-executa toda vez que a tab muda
//
//     return (
//       <div className="flex flex-col gap-4">
//         <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
//         {loading ? <Skeleton /> : <Table data={data} />}
//       </div>
//     )
//   }
//
// Por que content={null} e não colocar a <Table> dentro do content?
//   Se a tabela estiver dentro do content, ela será remontada do zero a cada
//   troca de tab (React destrói e recria o elemento). Fora do Tabs, a tabela
//   permanece montada e apenas recebe novos dados — transição mais suave e
//   sem perda de estado (scroll, seleção de linhas, etc.).
//
// ---------------------------------------------------------------------------

import { useState } from "react"
import { cn } from "@/lib/utils"

export type TabSize = "sm" | "md" | "lg"

export interface TabItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  activeTab?: string
  onChange?: (id: string) => void
  size?: TabSize
  className?: string
  contentClassName?: string
}

const sizeClasses: Record<TabSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-5 py-2 text-base",
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onChange,
  size = "md",
  className,
  contentClassName,
}: TabsProps) {
  const firstId = tabs[0]?.id ?? ""
  const [internalActive, setInternalActive] = useState(defaultTab ?? firstId)

  const activeId = controlledActive ?? internalActive

  function handleSelect(id: string) {
    if (controlledActive === undefined) setInternalActive(id)
    onChange?.(id)
  }

  const activeTab = tabs.find((t) => t.id === activeId)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        role="tablist"
        className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md font-medium outline-none transition-all cursor-pointer",
                "focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1",
                sizeClasses[size],
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
                tab.disabled && "cursor-not-allowed opacity-40"
              )}
            >
              {tab.icon && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab && (
        <div
          id={`tabpanel-${activeTab.id}`}
          role="tabpanel"
          className={contentClassName}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}
