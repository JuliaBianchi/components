import { cn } from "@/lib/utils"
import { TimelineItem, type TimelineItemData } from "./TimelineItem"

export type { TimelineItemData, TimelineVariant } from "./TimelineItem"

interface TimelineProps {
  items: TimelineItemData[]
  /** Orientação da timeline. Padrão: "vertical" */
  direction?: "vertical" | "horizontal"
  /** Oculta o lado "start" e força todo conteúdo para o lado "end" */
  compact?: boolean
  className?: string
}

export function Timeline({ items, direction = "vertical", compact = false, className }: TimelineProps) {
  return (
    <ol
      aria-label="Timeline"
      className={cn(direction === "horizontal" ? "flex flex-row" : "flex flex-col", className)}
    >
      {items.map((item, index) => (
        <TimelineItem
          key={item.id ?? index}
          {...item}
          direction={direction}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          compact={compact}
        />
      ))}
    </ol>
  )
}
