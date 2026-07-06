"use client"

import { useState } from "react"
import { AnimatedList } from "@/components/ui/AnimatedList"

const people = [
  { id: 1, name: "Júlia Bianchi", role: "Product Designer", avatar: "JB" },
  { id: 2, name: "Carlos Mendes", role: "Frontend Developer", avatar: "CM" },
  { id: 3, name: "Ana Souza", role: "UX Researcher", avatar: "AS" },
  { id: 4, name: "Rafael Lima", role: "Backend Developer", avatar: "RL" },
  { id: 5, name: "Beatriz Costa", role: "Product Manager", avatar: "BC" },
  { id: 6, name: "Thiago Ferreira", role: "DevOps Engineer", avatar: "TF" },
]

const notifications = [
  { id: 1, title: "Novo comentário", desc: "Carlos comentou no seu design", time: "2min atrás", color: "bg-blue-100 text-blue-600" },
  { id: 2, title: "Tarefa concluída", desc: "Deploy em produção finalizado", time: "15min atrás", color: "bg-green-100 text-green-600" },
  { id: 3, title: "Menção", desc: "Ana te mencionou em uma issue", time: "1h atrás", color: "bg-yellow-100 text-yellow-600" },
  { id: 4, title: "Pull Request", desc: "Rafael abriu um PR para revisão", time: "2h atrás", color: "bg-purple-100 text-purple-600" },
]

type Direction = "up" | "down" | "left" | "right"

export default function AnimatedListPage() {
  const [direction, setDirection] = useState<Direction>("up")
  const [listKey, setListKey] = useState(0)

  function replay() {
    setListKey((k) => k + 1)
  }

  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">AnimatedList</h2>
        <p className="mt-1 text-sm text-gray-500">
          Lista com animação staggered — cada item entra com delay incremental.
        </p>
      </div>

      {/* controls */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Direção:</span>
        {(["up", "down", "left", "right"] as Direction[]).map((d) => (
          <button
            key={d}
            onClick={() => { setDirection(d); replay() }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              direction === d
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {d}
          </button>
        ))}
        <button
          onClick={replay}
          className="ml-auto rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          ↺ Replay
        </button>
      </div>

      {/* people list */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Pessoas</p>
        <AnimatedList
          key={`people-${listKey}-${direction}`}
          items={people}
          keyExtractor={(item) => item.id}
          direction={direction}
          stagger={80}
          className="gap-2"
          renderItem={(item) => (
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                {item.avatar}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                <p className="truncate text-xs text-gray-400">{item.role}</p>
              </div>
            </div>
          )}
        />
      </div>

      {/* notifications list */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Notificações</p>
        <AnimatedList
          key={`notif-${listKey}-${direction}`}
          items={notifications}
          keyExtractor={(item) => item.id}
          direction={direction}
          stagger={100}
          duration={500}
          className="gap-2"
          renderItem={(item) => (
            <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <span className={`mt-0.5 rounded-md px-2 py-0.5 text-xs font-semibold ${item.color}`}>
                {item.title}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-700">{item.desc}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
            </div>
          )}
        />
      </div>
    </div>
  )
}
