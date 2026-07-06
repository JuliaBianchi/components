import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Checkbox } from '@/components/ui/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  args: { onChange: fn() },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Aceitar termos de uso' },
}

export const Checked: Story = {
  args: { label: 'Aceitar termos de uso', defaultChecked: true },
}

export const WithDescription: Story = {
  args: {
    label: 'Receber notificações',
    description: 'Você receberá emails sobre atualizações do produto.',
  },
}

export const WithError: Story = {
  args: { label: 'Aceitar termos de uso', error: 'Você precisa aceitar os termos para continuar.' },
}

export const Required: Story = {
  args: { label: 'Li e aceito a política de privacidade', required: true },
}

export const Disabled: Story = {
  args: { label: 'Opção desabilitada', defaultChecked: true, disabled: true },
}
