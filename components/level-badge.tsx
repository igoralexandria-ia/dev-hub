import { cn } from '@/lib/utils'
import { levelLabels, type Level } from '@/lib/data'

const styles: Record<Level, string> = {
  iniciante: 'border-chart-1/30 bg-chart-1/10 text-chart-1',
  intermediario: 'border-chart-2/30 bg-chart-2/10 text-chart-2',
  avancado: 'border-chart-4/30 bg-chart-4/10 text-chart-4',
}

export function LevelBadge({
  level,
  className,
}: {
  level: Level
  className?: string
}) {
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
