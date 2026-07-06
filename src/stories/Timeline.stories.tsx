import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Timeline, type TimelineItemData } from '@/components/ui/Timeline'

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.25l1.78 3.607 3.981.578-2.88 2.807.68 3.964L8 10.357l-3.561 1.87.68-3.964L2.24 5.435l3.981-.578L8 1.25z" />
  </svg>
)

function Event({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
    </div>
  )
}

const items: TimelineItemData[] = [
  { id: 1, start: 'Jan 2023', end: <Event title="Início do projeto"  desc="Kickoff com definição de escopo." />, icon: <StarIcon />, variant: 'default' },
  { id: 2, start: 'Mar 2023', end: <Event title="Primeiro protótipo" desc="MVP aprovado pelo cliente." />,       icon: <CheckIcon />, variant: 'primary' },
  { id: 3, start: 'Jun 2023', end: <Event title="Beta público"       desc="500 usuários na versão beta." />,     icon: <CheckIcon />, variant: 'success' },
  { id: 4, start: 'Dez 2023', end: <Event title="Lançamento"         desc="Produto em produção." />,             icon: <CheckIcon />, variant: 'success' },
]

const meta: Meta<typeof Timeline> = {
  title: 'UI/Timeline',
  component: Timeline,
  args: { items },
  argTypes: {
    direction: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  args: { direction: 'vertical' },
  parameters: { layout: 'padded' },
}

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="p-10"><Story /></div>],
}

export const Compact: Story = {
  args: { direction: 'vertical', compact: true },
  parameters: { layout: 'padded' },
}

export const Boxed: Story = {
  args: {
    direction: 'vertical',
    items: items.map((item) => ({ ...item, boxed: true })),
  },
  parameters: { layout: 'padded' },
}

export const NoDots: Story = {
  args: {
    direction: 'vertical',
    items: items.map((item) => ({ ...item, dot: false })),
  },
  parameters: { layout: 'padded' },
}
