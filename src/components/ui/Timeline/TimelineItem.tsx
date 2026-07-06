import { cn } from "@/lib/utils"

export type TimelineVariant = "default" | "primary" | "success" | "warning" | "error"

export interface TimelineItemData {
  id?: string | number
  /** Conteúdo esquerdo (vertical) ou superior (horizontal) */
  start?: React.ReactNode
  /** Conteúdo principal direito (vertical) ou inferior (horizontal) */
  end?: React.ReactNode
  /** Exibe a bolinha. Padrão: true */
  dot?: boolean
  /** Ícone dentro da bolinha (só se dot=true) */
  icon?: React.ReactNode
  /** Envolve o conteúdo em card com borda */
  boxed?: boolean
  variant?: TimelineVariant
}

interface TimelineItemProps extends TimelineItemData {
  direction: "vertical" | "horizontal"
  isFirst: boolean
  isLast: boolean
  compact: boolean
}

const dotStyles: Record<TimelineVariant, string> = {
  default: "border-gray-300  bg-white        text-gray-500",
  primary: "border-green-500 bg-green-50     text-green-600",
  success: "border-emerald-500 bg-emerald-50 text-emerald-600",
  warning: "border-yellow-400  bg-yellow-50  text-yellow-600",
  error:   "border-red-500   bg-red-50       text-red-600",
}

const lineStyles: Record<TimelineVariant, string> = {
  default: "bg-gray-200",
  primary: "bg-green-500",
  success: "bg-emerald-500",
  warning: "bg-yellow-400",
  error:   "bg-red-500",
}

function Box({ children, active }: { children: React.ReactNode; active?: boolean }) {
  if (!active) return <>{children}</>
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      {children}
    </div>
  )
}

function IconSlot({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center [&_svg]:h-full [&_svg]:w-full">
      {children}
    </span>
  )
}

export function TimelineItem({
  start, end, dot = true, icon, boxed = false, variant = "default",
  direction, isFirst, isLast, compact,
}: TimelineItemProps) {
  const lineCls = lineStyles[variant]
  const dotCls  = dotStyles[variant]

  /* ── vertical ─────────────────────────────────────────────────
     3-row grid per item:
       row 1 → connector line coming from the previous dot  (h-4)
       row 2 → start | dot | end  — dot aligns center of content
       row 3 → connector line going to the next dot         (h-8)
  ──────────────────────────────────────────────────────────────*/
  if (direction === "vertical") {
    const cols = compact
      ? "grid-cols-[1.75rem_1fr]"
      : "grid-cols-[8rem_1.75rem_1fr]"

    return (
      <li className={cn("grid gap-x-4", cols)}>

        {/* row 1 – line above */}
        {!compact && <span />}
        <div className="flex h-4 justify-center">
          <div className={cn("w-0.5 h-full", isFirst ? "opacity-0" : lineCls)} />
        </div>
        <span />

        {/* row 2 – content (all cells items-center so dot ↔ box middle) */}
        {!compact && (
          <div className="flex items-center justify-end">
            {start != null && (
              <Box active={boxed}>
                <div className="text-right text-sm text-gray-500">{start}</div>
              </Box>
            )}
          </div>
        )}
        <div className="relative flex items-center justify-center">
          {/* line segment through the content row — spans from top or center to bottom or center */}
          {!(isFirst && isLast) && (
            <div className={cn(
              "absolute w-0.5",
              isFirst ? "top-1/2 bottom-0" : isLast ? "top-0 bottom-1/2" : "inset-y-0",
              lineCls
            )} />
          )}
          {dot && (
            <div className={cn(
              "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
              dotCls
            )}>
              {icon && <IconSlot>{icon}</IconSlot>}
            </div>
          )}
        </div>
        <div className="flex items-center py-1">
          {end != null && <Box active={boxed}>{end}</Box>}
        </div>

        {/* row 3 – line below */}
        {!compact && <span />}
        <div className="flex h-8 justify-center">
          <div className={cn("w-0.5 h-full", isLast ? "opacity-0" : lineCls)} />
        </div>
        <span />

      </li>
    )
  }

  /* ── horizontal ───────────────────────────────────────────────*/
  return (
    <li className="flex min-w-0 flex-1 flex-col items-center">
      {!compact && (
        <div className="flex min-h-16 w-full items-end justify-center px-2 pb-3">
          {start != null && (
            <Box active={boxed}>
              <div className="text-center text-sm text-gray-500">{start}</div>
            </Box>
          )}
        </div>
      )}

      <div className="flex w-full items-center">
        <div className={cn("h-0.5 flex-1", isFirst ? "opacity-0" : lineCls)} />
        {dot ? (
          <div className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
            dotCls
          )}>
            {icon && <IconSlot>{icon}</IconSlot>}
          </div>
        ) : (
          <div className="h-2 w-2 shrink-0 rounded-full bg-gray-300" />
        )}
        <div className={cn("h-0.5 flex-1", isLast ? "opacity-0" : lineCls)} />
      </div>

      <div className="w-full px-2 pt-3">
        {end != null && (
          <Box active={boxed}>
            <div className="text-center text-sm">{end}</div>
          </Box>
        )}
      </div>
    </li>
  )
}
