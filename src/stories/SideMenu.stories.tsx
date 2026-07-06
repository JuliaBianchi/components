import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { SideMenu } from '@/components/ui/SideMenu'

const DashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const modules = [
  {
    label: 'Dashboard',
    icon: <DashIcon />,
    children: [
      { label: 'Visão geral', href: '/dashboard' },
      { label: 'Relatórios', href: '/dashboard/reports' },
      { label: 'Métricas', href: '/dashboard/metrics' },
    ],
  },
  {
    label: 'Usuários',
    icon: <UsersIcon />,
    children: [
      { label: 'Lista', href: '/users' },
      {
        label: 'Grupos',
        children: [
          { label: 'Administradores', href: '/users/groups/admin' },
          { label: 'Editores', href: '/users/groups/editors' },
          { label: 'Leitores', href: '/users/groups/readers' },
        ],
      },
      { label: 'Permissões', href: '/users/permissions' },
    ],
  },
  {
    label: 'Configurações',
    icon: <SettingsIcon />,
    children: [
      { label: 'Conta', href: '/settings/account' },
      { label: 'Segurança', href: '/settings/security' },
      { label: 'Integrações', href: '/settings/integrations' },
    ],
  },
]

const user = { name: 'Júlia Bianchi', email: 'juulia.sbianchi@gmail.com' }

const meta: Meta<typeof SideMenu> = {
  title: 'UI/SideMenu',
  component: SideMenu,
  parameters: { layout: 'fullscreen' },
  args: { modules, user, onNavigate: fn(), onLogout: fn() },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-gray-100">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActiveItem: Story = {
  args: { activeHref: '/dashboard' },
}

export const WithActiveNested: Story = {
  args: { activeHref: '/users/groups/admin' },
}
