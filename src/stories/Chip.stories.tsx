import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Chip, type ChipShape, type ChipVariant, type ChipSize } from '@/components/ui/Chip'

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  args: { children: 'Label', onRemove: undefined },
  argTypes: {
    shape:   { control: 'radio', options: ['round', 'square', 'rounded'] as ChipShape[] },
    variant: { control: 'radio', options: ['default', 'blue', 'green', 'yellow', 'red', 'purple'] as ChipVariant[] },
    size:    { control: 'radio', options: ['sm', 'md', 'lg'] as ChipSize[] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Novo comentário', variant: 'blue' },
}

export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Chip shape="round"   variant="blue">Redondo</Chip>
      <Chip shape="rounded" variant="blue">Arredondado</Chip>
      <Chip shape="square"  variant="blue">Quadrado</Chip>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'blue', 'green', 'yellow', 'red', 'purple'] as ChipVariant[]).map((v) => (
        <Chip key={v} variant={v}>{v}</Chip>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Chip size="sm" variant="green">Small</Chip>
      <Chip size="md" variant="green">Medium</Chip>
      <Chip size="lg" variant="green">Large</Chip>
    </div>
  ),
}

export const Removable: Story = {
  args: { children: 'TypeScript', variant: 'blue', onRemove: fn() },
}
