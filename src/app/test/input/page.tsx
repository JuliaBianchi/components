import { Input } from "@/components/ui/Input"

export default function InputPage() {
  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Input</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente Input.</p>
      </div>

      <div className="space-y-5">
        <Input label="Normal" placeholder="Digite algo..." />

        <Input label="Com hint" hint="Texto de ajuda abaixo do campo" placeholder="Digite algo..." />

        <Input label="Obrigatório" required placeholder="Campo obrigatório" />

        <Input label="Com erro" error="Este campo é inválido" placeholder="Digite algo..." />

        <Input label="Desabilitado" disabled placeholder="Não editável" />

        <Input label="Obrigatório com erro" required error="Preencha este campo" />
      </div>
    </div>
  )
}
