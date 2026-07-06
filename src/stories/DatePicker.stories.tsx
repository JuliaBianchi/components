import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { DatePicker } from '@/components/ui/DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  args: { onChange: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Data de nascimento' },
}

export const WithValue: Story = {
  args: { label: 'Data de início', defaultValue: '2024-03-15' },
}

export const WithMinMax: Story = {
  args: {
    label: 'Agendar reunião',
    hint: 'Apenas dias úteis desta semana',
    min: '2024-01-01',
    max: '2024-12-31',
  },
}

export const WithError: Story = {
  args: { label: 'Data de vencimento', error: 'Data inválida ou anterior a hoje' },
}

export const Disabled: Story = {
  args: { label: 'Data de encerramento', defaultValue: '2023-12-31', disabled: true },
}
