import { TimePicker } from "@/components/ui/TimePicker"

export default function TimePickerPage() {
  return (
    <div className="max-w-lg space-y-8 pb-96">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">TimePicker</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente TimePicker.</p>
      </div>

      <div className="space-y-5">
        <TimePicker label="Normal" />

        <TimePicker label="Com hint" hint="Selecione o horário de início" />

        <TimePicker label="Obrigatório" required />

        <TimePicker label="Com erro" error="Selecione um horário válido" />

        <TimePicker label="Desabilitado" disabled />

        <TimePicker label="Com valor padrão" defaultValue="09:00" />

        <TimePicker label="Intervalo de horários" multiple hint="Selecione início e fim" />

        <TimePicker label="Intervalo com valor padrão" multiple defaultValue={["08:00", "17:00"]} />
      </div>
    </div>
  )
}
