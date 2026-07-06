import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Switch } from '@/components/ui/Switch'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  args: { onChange: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Modo escuro' },
}

export const On: Story = {
  args: { label: 'Modo escuro', defaultChecked: true },
}

export const WithDescription: Story = {
  args: {
    label: 'Notificações push',
    description: 'Receba alertas em tempo real no seu dispositivo.',
  },
}

export const Disabled: Story = {
  args: { label: 'Recurso indisponível', defaultChecked: true, disabled: true },
}
