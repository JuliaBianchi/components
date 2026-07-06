'use client'

import { CurrencyInput } from "@/components/ui/CurrencyInput"
import { useState } from "react";


export default function CurrencyPage() {


 const [valor, setValor] = useState(0);

  return (
    <div className="max-w-lg space-y-8 pb-96">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">CurrencyInput</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente CurrencyInput.</p>
      </div>

      <div className="space-y-5">
        <CurrencyInput label="Normal" />

        <CurrencyInput label="Com hint" hint="Informe o valor em reais" />

        <CurrencyInput label="Obrigatório" required />

        <CurrencyInput label="Com erro" error="Valor inválido" />

        <CurrencyInput label="Desabilitado" disabled  />

        <CurrencyInput label="Com valor padrão" value={valor} onChange={setValor} />
        {valor}
      </div>
    </div>
  )
}
