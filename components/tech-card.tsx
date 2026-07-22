import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Technology } from '@/types/models'
import { LevelBadge } from '@/components/level-badge'

interface TechCardProps {
  tech: Technology
}

export function TechCard({ tech }: TechCardProps) {
  return (
    <Link
      href={`/tecnologias/${tech.slug}`}
      className="glass-card group flex flex-col p-5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between relative z-10">
        <div
          className="flex size-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 overflow-hidden bg-white/5 p-2 border border-white/10"
          aria-hidden="true"
        >
          {tech.iconUrl ? (
            <img src={tech.iconUrl} alt={tech.name} className="w-full h-full object-contain" />
          ) : (
            <span className="font-mono text-sm font-bold text-foreground">
              {tech.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div className="rounded-full bg-background/50 p-1.5 transition-colors group-hover:bg-primary/20">
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
      </div>

      <div className="mt-5 relative z-10">
        <h3 className="font-semibold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors">
          {tech.name}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
          {tech.category}
        </p>
      </div>

      <p className="mt-3 flex-1 text-sm text-muted-foreground/90 text-pretty relative z-10 leading-relaxed">
        {tech.tagline}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 relative z-10">
        <LevelBadge level={tech.level} />
        <span className="rounded-md bg-secondary/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {tech.commands.length} cmds
        </span>
      </div>
    </Link>
  )
}
