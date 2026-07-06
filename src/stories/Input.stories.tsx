import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Input } from '@/components/ui/Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  args: { onChange: fn(), onFocus: fn(), onBlur: fn() },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Digite algo...' },
}

export const WithLabel: Story = {
  args: { label: 'Nome completo', placeholder: 'João Silva' },
}

export const WithHint: Story = {
  args: { label: 'Senha', type: 'password', placeholder: '••••••••', hint: 'Mínimo 8 caracteres' },
}

export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'usuario@', error: 'Informe um email válido' },
}

export const Required: Story = {
  args: { label: 'CPF', placeholder: '000.000.000-00', required: true },
}

export const Disabled: Story = {
  args: { label: 'Campo desabilitado', defaultValue: 'Valor bloqueado', disabled: true },
}
