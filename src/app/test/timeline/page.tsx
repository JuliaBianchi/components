"use client"

import { useState } from "react"
import { Timeline, type TimelineItemData, type TimelineVariant } from "@/components/ui/Timeline"

/* ─── icons ──────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
  </svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.25l1.78 3.607 3.981.578-2.88 2.807.68 3.964L8 10.357l-3.561 1.87.68-3.964L2.24 5.435l3.981-.578L8 1.25z" />
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm7.25-3.25a.75.75 0 0 1 1.5 0v2.69l1.53 1.53a.75.75 0 0 1-1.06 1.06L7.47 8.28a.75.75 0 0 1-.22-.53V4.75Z" clipRule="evenodd" />
  </svg>
)
const AlertIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm7.25-2.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
  </svg>
)

/* ─── event content ──────────────────────────────────────────── */
function Event({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
    </div>
  )
}

/* ─── sample data ────────────────────────────────────────────── */
const mainItems: TimelineItemData[] = [
  {
    id: 1,
    start: "Jan 2023",
    end: <Event title="Início do projeto" desc="Kickoff com o time e definição de escopo." />,
    icon: <ClockIcon />,
    variant: "default",
  },
  {
    id: 2,
    start: "Mar 2023",
    end: <Event title="Primeiro protótipo" desc="MVP aprovado pelo cliente após dois ciclos de revisão." />,
    icon: <StarIcon />,
    variant: "primary",
  },
  {
    id: 3,
    start: "Jun 2023",
    end: <Event title="Beta público" desc="Versão beta liberada para 500 usuários selecionados." />,
    icon: <CheckIcon />,
    variant: "success",
  },
  {
    id: 4,
    start: "Set 2023",
    end: <Event title="Auditoria técnica" desc="Revisão de performance, segurança e acessibilidade." />,
    icon: <AlertIcon />,
    variant: "warning",
  },
  {
    id: 5,
    start: "Dez 2023",
    end: <Event title="Lançamento" desc="Produto em produção com 99.9% de uptime." />,
    icon: <CheckIcon />,
    variant: "success",
  },
]

const variantItems: (TimelineItemData & { label: string })[] = [
  { id: "d", label: "default", variant: "default", end: <Event title="Default" desc="Estilo padrão sem cor de destaque." /> },
  { id: "p", label: "primary", variant: "primary", end: <Event title="Primary" desc="Ação principal ou progresso." /> },
  { id: "s", label: "success", variant: "success", end: <Event title="Success" desc="Etapa concluída com sucesso." /> },
  { id: "w", label: "warning", variant: "warning", end: <Event title="Warning" desc="Atenção necessária neste ponto." /> },
  { id: "e", label: "error",   variant: "error",   end: <Event title="Error"   desc="Falha ou bloqueio identificado." /> },
]

/* ─── page ───────────────────────────────────────────────────── */
export default function TimelinePage() {
  const [direction, setDirection] = useState<"vertical" | "horizontal">("vertical")
  const [compact, setCompact]     = useState(false)
  const [boxed, setBoxed]         = useState(false)
  const [showDot, setShowDot]     = useState(true)
  const [showIcon, setShowIcon]   = useState(true)

  const liveItems: TimelineItemData[] = mainItems.map((item) => ({
    ...item,
    dot:  showDot,
    icon: showDot && showIcon ? item.icon : undefined,
    boxed,
  }))

  function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        onClick={() => onChange(!value)}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          value ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="max-w-3xl space-y-14">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
        <p className="mt-1 text-sm text-gray-500">
          Linha do tempo vertical ou horizontal com suporte a ícones, variantes e caixas.
        </p>
      </div>

      {/* controls */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Controles</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDirection("vertical")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${direction === "vertical" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            Vertical
          </button>
          <button
            onClick={() => setDirection("horizontal")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${direction === "horizontal" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            Horizontal
          </button>
          <div className="w-px bg-gray-200" />
          <Toggle label="Compacto"   value={compact}   onChange={setCompact} />
          <Toggle label="Com caixa"  value={boxed}     onChange={setBoxed} />
          <Toggle label="Bolinha"    value={showDot}   onChange={setShowDot} />
          <Toggle label="Ícone"      value={showIcon}  onChange={(v) => { setShowDot(true); setShowIcon(v) }} />
        </div>
      </section>

      {/* live preview */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Preview</p>
        <div className={direction === "horizontal" ? "overflow-x-auto pb-4" : ""}>
          <Timeline items={liveItems} direction={direction} compact={compact} />
        </div>
      </section>

      {/* variants */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Variantes de cor</p>
        <Timeline
          items={variantItems.map((item) => ({
            ...item,
            start: item.label,
            icon: <CheckIcon />,
          }))}
          direction="vertical"
        />
      </section>
    </div>
  )
}
