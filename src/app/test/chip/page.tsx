"use client"

import { useState } from "react"
import { Chip, type ChipShape, type ChipVariant, type ChipSize } from "@/components/ui/Chip"

const shapes: ChipShape[] = ["round", "square", "rounded"]
const variants: ChipVariant[] = ["default", "blue", "green", "yellow", "red", "purple"]
const sizes: ChipSize[] = ["sm", "md", "lg"]

const initialTags = ["Design", "Frontend", "React", "TypeScript", "Next.js", "Tailwind"]

export default function ChipPage() {
  const [selectedShape, setSelectedShape] = useState<ChipShape>("round")
  const [tags, setTags] = useState(initialTags)

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function resetTags() {
    setTags(initialTags)
  }

  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Chip</h2>
        <p className="mt-1 text-sm text-gray-500">
          Rótulos compactos para categorias, filtros e seleções.
        </p>
      </div>

      {/* shape selector */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Borda</p>
        <div className="flex gap-2">
          {shapes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedShape(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedShape === s
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Chip key={v} shape={selectedShape} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Chip>
          ))}
        </div>
      </section>

      {/* sizes */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Tamanhos</p>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Chip key={s} shape={selectedShape} variant="blue" size={s}>
              {s.toUpperCase()}
            </Chip>
          ))}
        </div>
      </section>

      {/* all variants × shapes grid */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Variantes × Bordas
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-6 text-xs font-medium text-gray-400" />
                {shapes.map((s) => (
                  <th key={s} className="pb-3 pr-6 text-xs font-medium capitalize text-gray-400">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {variants.map((v) => (
                <tr key={v}>
                  <td className="py-2 pr-6 text-xs capitalize text-gray-500">{v}</td>
                  {shapes.map((s) => (
                    <td key={s} className="py-2 pr-6">
                      <Chip shape={s} variant={v}>
                        Label
                      </Chip>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* removable chips demo */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Com remoção
          </p>
          {tags.length < initialTags.length && (
            <button
              onClick={resetTags}
              className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600"
            >
              Restaurar
            </button>
          )}
        </div>

        <div className="flex min-h-10 flex-wrap gap-2">
          {tags.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhum chip restante.</p>
          ) : (
            tags.map((tag) => (
              <Chip key={tag} shape={selectedShape} variant="blue" onRemove={() => removeTag(tag)}>
                {tag}
              </Chip>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
