import Link from 'next/link'
import { Layers, ArrowRight } from 'lucide-react'
import type { Stack } from '@/types/models'
import { getTechnology } from '@/lib/data'
import { LevelBadge } from '@/components/level-badge'

interface StackCardProps {
  stack: Stack
}

export function StackCard({ stack }: StackCardProps) {
  return (
    <div className="glass-card group flex flex-col p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between gap-3 relative z-10">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Layers className="size-5" />
        </span>
        <LevelBadge level={stack.level} />
      </div>

      <div className="mt-5 relative z-10">
        <h3 className="font-semibold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors text-balance">
          {stack.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground/90 text-pretty leading-relaxed">
          {stack.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 relative z-10">
        {stack.technologies.map((slug) => {
          const tech = getTechnology(slug)
          if (!tech) return null
          return (
            <span
              key={slug}
              className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-2 py-1 text-xs font-medium text-foreground shadow-sm"
            >
              {tech.iconUrl ? (
                <img src={tech.iconUrl} alt={tech.name} className="size-3.5 object-contain" />
              ) : (
                <span 
                  className="size-2 rounded-full" 
                  style={{ backgroundColor: tech.color }}
                />
              )}
              {tech.name}
            </span>
          )
        })}
      </div>

      <div className="mt-6 border-t border-border/50 pt-5 relative z-10">
        <Link
          href={`/stacks/${stack.slug}`}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md"
        >
          Ver setup completo
          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
