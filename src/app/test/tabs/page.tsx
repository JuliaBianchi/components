"use client"

import { Tabs } from "@/components/ui/Tabs"

const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
    <circle cx="8" cy="8" r="2.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l1.06-1.06M3.05 12.95l1.06-1.06" strokeLinecap="round" />
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
    <circle cx="8" cy="5" r="3" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" strokeLinecap="round" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
    <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 11v.5a1.5 1.5 0 0 0 3 0V11" strokeLinecap="round" />
  </svg>
)

const tabs = [
  {
    id: "perfil",
    label: "Perfil",
    icon: <UserIcon />,
    content: (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-800">Informações do perfil</h2>
        <p className="mt-1 text-sm text-gray-500">Gerencie seu nome, foto e dados pessoais.</p>
      </div>
    ),
  },
  {
    id: "config",
    label: "Configurações",
    icon: <SettingsIcon />,
    content: (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-800">Preferências do sistema</h2>
        <p className="mt-1 text-sm text-gray-500">Tema, idioma e outras configurações gerais.</p>
      </div>
    ),
  },
  {
    id: "notif",
    label: "Notificações",
    icon: <BellIcon />,
    content: (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-800">Central de notificações</h2>
        <p className="mt-1 text-sm text-gray-500">Escolha quais alertas você quer receber.</p>
      </div>
    ),
  },
  {
    id: "disabled",
    label: "Bloqueado",
    disabled: true,
    content: null,
  },
]

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Default (md)</p>
        <Tabs tabs={tabs} />
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Small</p>
        <Tabs tabs={tabs} size="sm" />
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Large</p>
        <Tabs tabs={tabs} size="lg" />
      </section>

      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Sem ícones</p>
        <Tabs tabs={tabs.map(({ icon: _, ...t }) => t)} />
      </section>
    </div>
  )
}
