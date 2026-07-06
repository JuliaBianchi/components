import { Switch } from "@/components/ui/Switch"

export default function SwitchPage() {
  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Switch</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente Switch.</p>
      </div>

      <div className="space-y-5">
        <Switch label="Normal" />

        <Switch label="Ativado" defaultChecked />

        <Switch label="Com descrição" description="Habilita notificações por e-mail" />

        <Switch label="Com descrição ativado" description="Habilita notificações por e-mail" defaultChecked />

        <Switch label="Desabilitado" disabled />

        <Switch label="Desabilitado e ativado" defaultChecked disabled />
      </div>
    </div>
  )
}
