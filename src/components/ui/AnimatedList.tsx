"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

interface AnimatedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string | number
  direction?: Direction
  duration?: number
  stagger?: number
  className?: string
  itemClassName?: string
}

const translate: Record<Direction, string> = {
  up:    "translateY(16px)",
  down:  "translateY(-16px)",
  left:  "translateX(16px)",
  right: "translateX(-16px)",
}

export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  direction = "up",
  duration = 400,
  stagger = 60,
  className,
  itemClassName,
}: AnimatedListProps<T>) {
  const uid = useId().replace(/:/g, "")
  const cls = `anim-list-${uid}`

  return (
    <>
      <style>{`
        @keyframes ${cls}-in {
          from { opacity: 0; transform: ${translate[direction]}; }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        .${cls}-item {
          opacity: 0;
          animation-name: ${cls}-in;
          animation-duration: ${duration}ms;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }
      `}</style>

      <ul className={cn("flex flex-col", className)}>
        {items.map((item, i) => (
          <li
            key={keyExtractor(item, i)}
            className={cn(`${cls}-item`, itemClassName)}
            style={{ animationDelay: `${i * stagger}ms` }}
          >
            {renderItem(item, i)}
          </li>
        ))}
      </ul>
    </>
  )
}
