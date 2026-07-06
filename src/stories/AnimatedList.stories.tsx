import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AnimatedList } from '@/components/ui/AnimatedList'

const people = [
  { id: 1, name: 'Júlia Bianchi',  role: 'Product Designer',   avatar: 'JB' },
  { id: 2, name: 'Carlos Mendes', role: 'Frontend Developer', avatar: 'CM' },
  { id: 3, name: 'Ana Souza',     role: 'UX Researcher',      avatar: 'AS' },
  { id: 4, name: 'Rafael Lima',   role: 'Backend Developer',  avatar: 'RL' },
  { id: 5, name: 'Beatriz Costa', role: 'Product Manager',    avatar: 'BC' },
]

const notifications = [
  { id: 1, title: 'Novo comentário', desc: 'Carlos comentou no design',      time: '2min',  color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Concluído',       desc: 'Deploy em produção finalizado',  time: '15min', color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'Menção',          desc: 'Ana te mencionou em uma issue',  time: '1h',    color: 'bg-yellow-100 text-yellow-600' },
  { id: 4, title: 'Pull Request',    desc: 'Rafael abriu um PR para revisão', time: '2h',   color: 'bg-purple-100 text-purple-600' },
]

const meta: Meta<typeof AnimatedList> = {
  title: 'UI/AnimatedList',
  component: AnimatedList,
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down', 'left', 'right'] },
    stagger:   { control: { type: 'range', min: 0, max: 300, step: 20 } },
    duration:  { control: { type: 'range', min: 100, max: 1000, step: 50 } },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const People: Story = {
  args: {
    items: people,
    keyExtractor: (item) => item.id,
    direction: 'up',
    stagger: 80,
    className: 'gap-2 w-72',
    renderItem: (item) => (
      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
          {item.avatar}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
          <p className="truncate text-xs text-gray-400">{item.role}</p>
        </div>
      </div>
    ),
  },
}

export const Notifications: Story = {
  args: {
    items: notifications,
    keyExtractor: (item) => item.id,
    direction: 'up',
    stagger: 100,
    duration: 500,
    className: 'gap-2 w-80',
    renderItem: (item) => (
      <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${item.color}`}>
          {item.title}
        </span>
        <p className="min-w-0 flex-1 truncate text-sm text-gray-700">{item.desc}</p>
        <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
      </div>
    ),
  },
}
