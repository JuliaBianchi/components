import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { TimePicker } from '@/components/ui/TimePicker'

const meta: Meta<typeof TimePicker> = {
  title: 'UI/TimePicker',
  component: TimePicker,
  args: { onChange: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Horário de início' },
}

export const WithValue: Story = {
  args: { label: 'Reunião', defaultValue: '14:30' },
}

export const Range: Story = {
  args: { label: 'Período de atendimento', multiple: true },
}

export const RangeWithValue: Story = {
  args: {
    label: 'Expediente',
    multiple: true,
    defaultValue: ['09:00', '18:00'],
  },
}

export const WithError: Story = {
  args: { label: 'Horário', error: 'Horário fora do período permitido' },
}

export const Disabled: Story = {
  args: { label: 'Horário fixo', defaultValue: '08:00', disabled: true },
}
