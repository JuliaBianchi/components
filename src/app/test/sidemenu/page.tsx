"use client"

import { useState } from "react"
import { SideMenu } from "@/components/ui/SideMenu"

const modules = [
  {
    label: "Cadastros",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    children: [
      {
        label: "Clientes",
        children: [
          { label: "Pessoa Física", href: "/clientes/pf" },
          { label: "Pessoa Jurídica", href: "/clientes/pj" },
        ],
      },
      { label: "Fornecedores", href: "/fornecedores" },
      { label: "Produtos", href: "/produtos" },
    ],
  },
  {
    label: "Financeiro",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="1" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    children: [
      {
        label: "Contas",
        children: [
          { label: "A Pagar", href: "/financeiro/pagar" },
          { label: "A Receber", href: "/financeiro/receber" },
        ],
      },
      { label: "Extrato", href: "/financeiro/extrato" },
    ],
  },
  {
    label: "Relatórios",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" x2="18" y1="20" y2="10" />
        <line x1="12" x2="12" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="14" />
      </svg>
    ),
    children: [
      { label: "Vendas", href: "/relatorios/vendas" },
      { label: "Estoque", href: "/relatorios/estoque" },
      { label: "Financeiro", href: "/relatorios/financeiro" },
    ],
  },
]

const user = {
  name: "Júlia Bianchi",
  email: "juulia.sbianchi@gmail.com",
}

export default function SideMenuPage() {
  const [active, setActive] = useState("/clientes/pf")

  return (
    <div className="-mx-10 -my-8 flex h-screen">
      <SideMenu
        modules={modules}
        user={user}
        activeHref={active}
        onNavigate={setActive}
        onLogout={() => alert("Logout!")}
      />
      <main className="flex flex-1 items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Página ativa: <span className="font-medium text-gray-700">{active}</span></p>
      </main>
    </div>
  )
}
