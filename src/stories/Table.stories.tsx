import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Table, type TableColumn } from '@/components/ui/Table'
import { fn } from 'storybook/test'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "ativo" | "inativo"
}

const data: User[] = [
  { id: 1, name: 'Júlia Bianchi',  email: 'juulia@email.com',  role: 'Designer',   status: 'ativo'    },
  { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com',  role: 'Dev Frontend', status: 'ativo'   },
  { id: 3, name: 'Ana Souza',     email: 'ana@email.com',     role: 'UX Research',  status: 'inativo' },
  { id: 4, name: 'Rafael Lima',   email: 'rafael@email.com',  role: 'Dev Backend',  status: 'ativo'   },
  { id: 5, name: 'Beatriz Costa', email: 'beatriz@email.com', role: 'Product',      status: 'inativo' },
]

const columns: TableColumn<User>[] = [
  { key: 'id',    header: '#',      width: '3rem', align: 'center', sortable: true },
  { key: 'name',  header: 'Nome',   sortable: true },
  { key: 'email', header: 'E-mail' },
  { key: 'role',  header: 'Cargo',  sortable: true },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    sortable: true,
    getValue: (row) => row.status,
    render: (row) => (
      <span
        className={
          row.status === 'ativo'
            ? 'inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700'
            : 'inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500'
        }
      >
        {row.status}
      </span>
    ),
  },
]

const meta: Meta<typeof Table<User>> = {
  title: 'UI/Table',
  component: Table,
  parameters: { layout: 'padded' },
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Striped: Story = {
  args: { striped: true },
}

export const Loading: Story = {
  args: { loading: true, skeletonRows: 5 },
}

export const Empty: Story = {
  args: { data: [] },
}

export const Clickable: Story = {
  args: { onRowClick: fn() },
}

export const WithFilter: Story = {
  args: { filterable: true, filterPlaceholder: 'Buscar...' },
}

export const FilterAndSort: Story = {
  args: { filterable: true, striped: true },
}
