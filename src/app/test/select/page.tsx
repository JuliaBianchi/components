"use client"

import { useState } from "react"
import { Select } from "@/components/ui/Select"

const fruitOptions = [
  { value: "apple", label: "Maçã" },
  { value: "banana", label: "Banana" },
  { value: "grape", label: "Uva" },
]

const countryOptions = [
  { value: "br", label: "Brasil" },
  { value: "ar", label: "Argentina" },
  { value: "us", label: "Estados Unidos" },
  { value: "de", label: "Alemanha" },
  { value: "fr", label: "França" },
  { value: "it", label: "Itália" },
  { value: "es", label: "Espanha" },
  { value: "pt", label: "Portugal" },
  { value: "jp", label: "Japão" },
  { value: "cn", label: "China" },
  { value: "in", label: "Índia" },
  { value: "mx", label: "México" },
  { value: "ca", label: "Canadá" },
  { value: "au", label: "Austrália" },
  { value: "ru", label: "Rússia" },
  { value: "za", label: "África do Sul" },
  { value: "ng", label: "Nigéria" },
  { value: "eg", label: "Egito" },
  { value: "tr", label: "Turquia" },
  { value: "kr", label: "Coreia do Sul" },
]

export default function SelectPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="max-w-lg space-y-8 pb-96">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Select</h2>
        <p className="mt-1 text-sm text-gray-500">Variações e estados do componente Select.</p>
      </div>

      <div className="space-y-5">
        <Select label="Normal" options={fruitOptions} placeholder="Selecione uma opção" />

        <Select label="Com hint" options={fruitOptions} placeholder="Selecione uma opção" hint="Escolha sua fruta favorita" />

        <Select label="Obrigatório" options={fruitOptions} placeholder="Selecione uma opção" required />

        <Select label="Com erro" options={fruitOptions} placeholder="Selecione uma opção" error="Selecione uma opção válida" />

        <Select label="Desabilitado" options={fruitOptions} placeholder="Selecione uma opção" disabled />

        <Select label="Lista grande (com pesquisa)" options={countryOptions} placeholder="Selecione um país" hint="20 países disponíveis — use a pesquisa para filtrar" searchable />

        <Select label="Lista grande (sem pesquisa)" options={countryOptions} placeholder="Selecione um país" />

        <div className="space-y-2">
          <Select label="Carregando" options={[]} placeholder="Aguardando dados..." loading={loading} />
          <button
            onClick={() => setLoading((prev) => !prev)}
            className="text-xs text-gray-500 underline"
          >
            {loading ? "Simular dados carregados" : "Simular carregando"}
          </button>
        </div>
      </div>
    </div>
  )
}
