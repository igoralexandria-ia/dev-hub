'use client'

import { useMemo, useState } from 'react'
import { technologies, levelLabels, type Level } from '@/lib/data'
import { TechCard } from '@/components/tech-card'
import { cn } from '@/lib/utils'

const levels: (Level | 'todos')[] = [
  'todos',
  'iniciante',
  'intermediario',
  'avancado',
]

export function TechExplorer() {
  const [level, setLevel] = useState<Level | 'todos'>('todos')
  const [category, setCategory] = useState<string>('todas')

  const categories = useMemo(
    () => ['todas', ...Array.from(new Set(technologies.map((t) => t.category)))],
    [],
  )

  const filtered = technologies.filter((t) => {
    const matchLevel = level === 'todos' || t.level === level
    const matchCategory = category === 'todas' || t.category === category
    return matchLevel && matchCategory
  })

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nível
          </span>
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                level === l
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {l === 'todos' ? 'Todos' : levelLabels[l]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Categoria
          </span>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                category === c
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {c === 'todas' ? 'Todas' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tech) => (
          <TechCard key={tech.slug} tech={tech} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Nenhuma tecnologia encontrada com esses filtros.
        </p>
      )}
    </div>
  )
}
