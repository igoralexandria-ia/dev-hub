import { cn } from '@/lib/utils'
import type { Level } from '@/types/models'
import { levelLabels } from '@/lib/data'

const styles: Record<Level, string> = {
  iniciante: 'bg-green-500/10 text-green-500 border-green-500/20',
  intermediario: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  avancado: 'bg-red-500/10 text-red-500 border-red-500/20',
}

interface LevelBadgeProps {
  level: Level
  className?: string
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[level],
        className,
      )}
    >
      {levelLabels[level]}
    </span>
  )
}
