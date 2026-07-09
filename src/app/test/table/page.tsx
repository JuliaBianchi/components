"use client"

import { useState } from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Table, type TableColumn } from "@/components/ui/Table"
import { Tabs } from "@/components/ui/Tabs"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "ativo" | "inativo" | "pendente"
}

const allUsers: User[] = [
  { id: 1, name: "Júlia Bianchi",  email: "juulia@email.com",  role: "Designer",     status: "ativo"    },
  { id: 2, name: "Carlos Mendes", email: "carlos@email.com",  role: "Dev Frontend",  status: "ativo"    },
  { id: 3, name: "Ana Souza",     email: "ana@email.com",     role: "UX Research",   status: "inativo"  },
  { id: 4, name: "Rafael Lima",   email: "rafael@email.com",  role: "Dev Backend",   status: "ativo"    },
  { id: 5, name: "Beatriz Costa", email: "beatriz@email.com", role: "Product",       status: "pendente" },
  { id: 6, name: "Marcos Neves",  email: "marcos@email.com",  role: "QA",            status: "inativo"  },
]

const statusBadge: Record<User["status"], string> = {
  ativo:    "bg-green-100 text-green-700",
  inativo:  "bg-gray-100 text-gray-500",
  pendente: "bg-yellow-100 text-yellow-700",
}

const columns: TableColumn<User>[] = [
  { key: "id",    header: "#",       width: "3rem", align: "center", sortable: true },
  { key: "name",  header: "Nome",    sortable: true },
  { key: "email", header: "E-mail" },
  { key: "role",  header: "Cargo",   sortable: true },
  {
    key: "status",
    header: "Status",
    align: "center",
    sortable: true,
    getValue: (row) => row.status,
    render: (row) => (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[row.status]}`}>
        {row.status}
      </span>
    ),
  },
]

const tabs = [
  { id: "todos",    label: "Todos",    content: null },
  { id: "ativo",    label: "Ativos",   content: null },
  { id: "inativo",  label: "Inativos", content: null },
  { id: "pendente", label: "Pendentes",content: null },
]

export default function TablePage() {
  const [activeTab, setActiveTab] = useState("todos")

  const filtered =
    activeTab === "todos"
      ? allUsers
      : allUsers.filter((u) => u.status === activeTab)

  return (
    <div className="flex flex-col gap-6">
      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Tabs + Tabela (filtro por status)
        </p>
        <div className="flex flex-col gap-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Table
            columns={columns}
            data={filtered}
            keyExtractor={(row) => row.id}
            filterable
            filterPlaceholder="Buscar usuário..."
            actions={(row) => (
              <>
                <button
                  onClick={() => alert(`Editar: ${row.name}`)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  title="Editar"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => alert(`Excluir: ${row.name}`)}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  title="Excluir"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Striped
        </p>
        <Table columns={columns} data={allUsers} keyExtractor={(row) => row.id} striped />
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Loading skeleton
        </p>
        <Table columns={columns} data={[]} keyExtractor={(row) => row.id} loading skeletonRows={4} />
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Empty state
        </p>
        <Table columns={columns} data={[]} keyExtractor={(row) => row.id} emptyMessage="Nenhum usuário encontrado." />
      </section>
    </div>
  )
}
