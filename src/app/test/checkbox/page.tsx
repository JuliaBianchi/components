import { Checkbox } from "@/components/ui/Checkbox"

export default function CheckboxPage() {
  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Checkbox</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente Checkbox.</p>
      </div>

      <div className="space-y-5">
        <Checkbox label="Normal" />

        <Checkbox label="Marcado" defaultChecked />

        <Checkbox label="Com descrição" description="Texto explicativo sobre esta opção" />

        <Checkbox label="Obrigatório" required />

        <Checkbox label="Com erro" error="Este campo é obrigatório" />

        <Checkbox label="Desabilitado" disabled />

        <Checkbox label="Desabilitado e marcado" defaultChecked disabled />
      </div>
    </div>
  )
}
