import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CurrencyInput } from '@/components/ui/CurrencyInput'

const meta: Meta<typeof CurrencyInput> = {
  title: 'UI/CurrencyInput',
  component: CurrencyInput,
  args: { onChange: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Valor do produto' },
}

export const WithValue: Story = {
  args: { label: 'Preço', defaultValue: 149.9 },
}

export const WithHint: Story = {
  args: { label: 'Desconto', hint: 'Máximo de R$ 500,00 por pedido' },
}

export const WithError: Story = {
  args: { label: 'Valor mínimo', defaultValue: 0, error: 'O valor mínimo é R$ 10,00' },
}

export const Required: Story = {
  args: { label: 'Total do pedido', required: true },
}

export const Disabled: Story = {
  args: { label: 'Subtotal', defaultValue: 89.9, disabled: true },
}
