import { DatePicker } from "@/components/ui/DatePicker"

export default function DatePickerPage() {
  return (
    <div className="max-w-lg space-y-8 pb-96">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">DatePicker</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente DatePicker.</p>
      </div>

      <div className="space-y-5">
        <DatePicker label="Normal" />

        <DatePicker label="Com hint" hint="Selecione a data de nascimento" />

        <DatePicker label="Obrigatório" required />

        <DatePicker label="Com erro" error="Selecione uma data válida" />

        <DatePicker label="Desabilitado" disabled />

        <DatePicker label="Data mínima (hoje)" min={new Date().toISOString().slice(0, 10)} hint="Apenas datas futuras" />

        <DatePicker label="Com valor padrão" defaultValue="2025-06-20" />
      </div>
    </div>
  )
}
