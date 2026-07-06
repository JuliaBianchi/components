import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Select } from '@/components/ui/Select'

const options = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'ba', label: 'Bahia' },
  { value: 'pr', label: 'Paraná' },
]

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  args: { options, onChange: fn(), onClear: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Selecione um estado' },
}

export const WithLabel: Story = {
  args: { label: 'Estado', placeholder: 'Selecione um estado' },
}

export const Searchable: Story = {
  args: { label: 'Estado', searchable: true },
}

export const WithError: Story = {
  args: { label: 'Estado', error: 'Selecione um estado válido' },
}

export const Loading: Story = {
  args: { label: 'Carregando...', loading: true, options: [] },
}

export const Disabled: Story = {
  args: { label: 'Estado', defaultValue: 'sp', disabled: true },
}
