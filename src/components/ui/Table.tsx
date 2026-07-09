"use client"

// ---------------------------------------------------------------------------
// Combinando filtro de status (externo) com busca por texto (interno)
// ---------------------------------------------------------------------------
//
// O filtro de status — seja via Tabs, Select ou Chips — fica FORA da Table.
// Você filtra o array e passa o resultado para a prop `data`. A busca por
// texto (`filterable`) opera sobre o que já chegou filtrado. Os dois se
// empilham automaticamente sem nenhuma configuração extra:
//
//   [todos os dados]
//         ↓  filtro de status (seu estado, fora da Table)
//   [só os ativos]
//         ↓  busca por texto (Table, internamente via `filterable`)
//   [ativos que contêm "ana"]
//
// Exemplo com Tabs + Table:
//
//   const [activeTab, setActiveTab] = useState("todos")
//   const [search, ...] = // controlado internamente pela Table
//
//   const byStatus = activeTab === "todos"
//     ? data
//     : data.filter((row) => row.status === activeTab)
//
//   return (
//     <>
//       <Tabs tabs={statusTabs} activeTab={activeTab} onChange={setActiveTab} />
//       <Table data={byStatus} columns={columns} filterable ... />
//     </>
//   )
//
// Se precisar de múltiplos filtros externos (ex: status + período), combine
// todos antes de passar para `data`:
//
//   const filtered = data
//     .filter((row) => activeTab === "todos" || row.status === activeTab)
//     .filter((row) => !period || row.date >= period.start)
//
// ---------------------------------------------------------------------------

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

export type ColumnAlign = "left" | "center" | "right"
export type SortDir = "asc" | "desc"

export interface TableColumn<T> {
  key: string
  header: React.ReactNode
  // Personaliza a célula. Quando ausente, exibe row[key] como string.
  render?: (row: T, index: number) => React.ReactNode
  // Valor usado para filtro e ordenação em colunas com render customizado.
  // Se omitido, usa row[key] convertido para string.
  getValue?: (row: T) => string
  width?: string
  align?: ColumnAlign
  sortable?: boolean
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string | number
  loading?: boolean
  skeletonRows?: number
  emptyMessage?: string
  onRowClick?: (row: T) => void
  striped?: boolean
  // Campo de busca interno (não-controlado)
  filterable?: boolean
  filterLabel?: string
  filterPlaceholder?: string
  // Modo controlado: use seu próprio componente de busca externo.
  // Quando passado, desativa o campo interno e usa esse valor para filtrar.
  filterValue?: string
  // Slot livre acima da tabela: coloque Select, Chips, botões, etc.
  toolbar?: React.ReactNode
  // Coluna de ações no final de cada linha. Recebe a linha e retorna botões/ícones.
  actions?: (row: T) => React.ReactNode
  actionsHeader?: React.ReactNode
  className?: string
}

const alignClass: Record<ColumnAlign, string> = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
}

function getRawValue<T>(row: T, col: TableColumn<T>): string {
  if (col.getValue) return col.getValue(row)
  const v = (row as Record<string, unknown>)[col.key]
  return v == null ? "" : String(v)
}

function SortIcon({ dir }: { dir: SortDir | null }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none text-gray-400">
      <svg
        viewBox="0 0 8 5"
        className={cn("h-2 w-2", dir === "asc" ? "text-gray-700" : "text-gray-300")}
        fill="currentColor"
      >
        <path d="M4 0 8 5H0z" />
      </svg>
      <svg
        viewBox="0 0 8 5"
        className={cn("h-2 w-2", dir === "desc" ? "text-gray-700" : "text-gray-300")}
        fill="currentColor"
      >
        <path d="M4 5 0 0h8z" />
      </svg>
    </span>
  )
}

function SkeletonRow({ columns }: { columns: TableColumn<unknown>[] }) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3">
          <div className="h-4 animate-pulse rounded bg-gray-200" />
        </td>
      ))}
    </tr>
  )
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  skeletonRows = 5,
  emptyMessage = "Nenhum resultado encontrado.",
  onRowClick,
  striped = false,
  filterable = false,
  filterLabel,
  filterPlaceholder = "Buscar...",
  filterValue: controlledFilter,
  toolbar,
  actions,
  actionsHeader = "",
  className,
}: TableProps<T>) {
  const [internalFilter, setInternalFilter] = useState("")
  const filterValue = controlledFilter ?? internalFilter
  const [sortKey, setSortKey]         = useState<string | null>(null)
  const [sortDir, setSortDir]         = useState<SortDir>("asc")

  function handleSort(colKey: string) {
    if (sortKey === colKey) {
      if (sortDir === "asc") {
        setSortDir("desc")
      } else {
        setSortKey(null)
        setSortDir("asc")
      }
    } else {
      setSortKey(colKey)
      setSortDir("asc")
    }
  }

  const processed = useMemo(() => {
    let rows = [...data]

    if ((filterable || controlledFilter !== undefined) && filterValue.trim()) {
      const term = filterValue.trim().toLowerCase()
      rows = rows.filter((row) =>
        columns.some((col) => getRawValue(row, col).toLowerCase().includes(term))
      )
    }

    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey)
      if (col) {
        rows.sort((a, b) => {
          const va = getRawValue(a, col)
          const vb = getRawValue(b, col)
          const cmp = va.localeCompare(vb, "pt-BR", { numeric: true, sensitivity: "base" })
          return sortDir === "asc" ? cmp : -cmp
        })
      }
    }

    return rows
  }, [data, filterValue, filterable, controlledFilter, sortKey, sortDir, columns])

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(filterable || toolbar) && (
        <div className="flex flex-wrap items-end gap-3">
          {filterable && controlledFilter === undefined && (
            <label className="flex flex-col gap-1">
              {filterLabel && (
                <span className="text-sm font-medium text-gray-700">{filterLabel}</span>
              )}
              <input
                type="search"
                value={internalFilter}
                onChange={(e) => setInternalFilter(e.target.value)}
                placeholder={filterPlaceholder}
                className="w-full max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </label>
          )}
          {toolbar}
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    "px-4 py-3 font-semibold text-gray-600",
                    alignClass[col.align ?? "left"],
                    col.sortable && "cursor-pointer select-none hover:text-gray-900"
                  )}
                >
                  <span className="inline-flex items-center gap-0.5">
                    {col.header}
                    {col.sortable && (
                      <SortIcon dir={sortKey === col.key ? sortDir : null} />
                    )}
                  </span>
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right font-semibold text-gray-600">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, i) => (
                <SkeletonRow key={i} columns={columns as TableColumn<unknown>[]} />
              ))
            ) : processed.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              processed.map((row, i) => (
                <tr
                  key={keyExtractor(row, i)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    !striped && "border-b border-gray-100 last:border-0",
                    "transition-colors",
                    striped && (i % 2 === 0 ? "bg-white" : "bg-gray-50"),
                    onRowClick && "cursor-pointer hover:bg-blue-50"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-gray-700",
                        alignClass[col.align ?? "left"]
                      )}
                    >
                      {col.render
                        ? col.render(row, i)
                        : getRawValue(row, col)}
                    </td>
                  ))}
                  {actions && (
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center justify-end gap-1">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
