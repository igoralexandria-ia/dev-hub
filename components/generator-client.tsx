'use client'

import { useState } from 'react'
import { Check, Wand2 } from 'lucide-react'
import { technologies } from '@/lib/data'
import { generateSetup } from '@/lib/generator'
import { SetupSteps } from '@/components/setup-steps'
import { cn } from '@/lib/utils'

export function GeneratorClient() {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  const steps = generateSetup(selected)

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1.5fr] items-start">
      {/* Seleção */}
      <div className="glass-card p-6 min-w-0">
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="text-sm font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight">
              Escolha sua Stack
            </h2>
          </div>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Limpar escolhas
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {technologies.map((tech) => {
            const active = selected.includes(tech.slug)
            return (
              <button
                key={tech.slug}
                type="button"
                onClick={() => toggle(tech.slug)}
                aria-pressed={active}
                className={cn(
                  'cursor-pointer group relative flex items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-all duration-300',
                  active
                    ? 'border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(101,40,245,0.15)] scale-[1.02]'
                    : 'border-border/50 bg-background/50 hover:border-primary/30 hover:bg-card hover:shadow-md',
                )}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                )}
                <div
                  className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110 overflow-hidden bg-white/5 p-2 border border-white/10"
                  aria-hidden="true"
                >
                  {tech.iconUrl ? (
                    <img src={tech.iconUrl} alt={tech.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-mono text-xs font-bold text-foreground">
                      {tech.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="relative z-10 min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {tech.name}
                  </span>
                  <span className="block truncate text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {tech.category}
                  </span>
                </span>
                <span
                  className={cn(
                    'relative z-10 flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300',
                    active
                      ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-sm'
                      : 'border-border/50 bg-card group-hover:border-primary/30',
                  )}
                >
                  {active && <Check className="size-3.5" strokeWidth={3} />}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Resultado */}
      <div className="glass-card p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-w-0">
        <div className="rounded-xl bg-background/40 p-6 h-full min-h-[400px] flex flex-col">
          <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-4">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="text-sm font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <Wand2 className="size-5 text-primary" />
              Setup Gerado
            </h2>
          </div>

          {steps.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted/50 mb-4 ring-1 ring-border/50">
                <Wand2 className="size-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium">
                Selecione as tecnologias ao lado para gerar <br/> seu passo a passo otimizado.
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SetupSteps steps={steps} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
