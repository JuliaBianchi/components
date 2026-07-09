import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs, type TabItem, type TabSize } from '@/components/ui/Tabs'

const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
    <circle cx="8" cy="8" r="2.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l1.06-1.06M3.05 12.95l1.06-1.06" strokeLinecap="round" />
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
    <circle cx="8" cy="5" r="3" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" strokeLinecap="round" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
    <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 11v.5a1.5 1.5 0 0 0 3 0V11" strokeLinecap="round" />
  </svg>
)

function Panel({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', padding: '1.5rem' }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827' }}>{title}</p>
      <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>{desc}</p>
    </div>
  )
}

const tabs: TabItem[] = [
  { id: 'perfil',  label: 'Perfil',          icon: <UserIcon />,     content: <Panel title="Perfil"          desc="Gerencie seu nome e dados pessoais." /> },
  { id: 'config',  label: 'Configurações',   icon: <SettingsIcon />, content: <Panel title="Configurações"   desc="Tema, idioma e preferências gerais." /> },
  { id: 'notif',   label: 'Notificações',    icon: <BellIcon />,     content: <Panel title="Notificações"    desc="Escolha quais alertas receber." /> },
  { id: 'blocked', label: 'Bloqueado',       disabled: true,         content: null },
]

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  args: { tabs },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] as TabSize[] },
  },
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'sm' } }

export const Large: Story = { args: { size: 'lg' } }

export const WithoutIcons: Story = {
  args: {
    tabs: tabs.map(({ icon: _, ...t }) => t),
  },
}

export const Controlled: Story = {
  args: { activeTab: 'config' },
}
