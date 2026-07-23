'use client'

import { useState } from 'react'
import { Check, Wand2 } from 'lucide-react'
import type { Technology, CommandWithTech, StackStep } from '@/types/models'
import { SetupSteps } from '@/components/setup-steps'
import { TechCommandsModal } from '@/components/tech-commands-modal'
import { recipes } from '@/lib/generator'
import { cn } from '@/lib/utils'

interface GeneratorClientProps {
  initialTechnologies: Technology[]
  allCommands?: CommandWithTech[]
}

export function GeneratorClient({ initialTechnologies, allCommands = [] }: GeneratorClientProps) {
  
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [techStepsMap, setTechStepsMap] = useState<Record<string, StackStep[]>>({})
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTech, setModalTech] = useState<Technology | null>(null)
  
  function handleTechClick(tech: Technology) {
    const isSelected = selectedTechs.includes(tech.slug)
    
    if (isSelected) {
      setSelectedTechs(prev => prev.filter(s => s !== tech.slug))
      setTechStepsMap(prev => {
        const next = { ...prev }
        delete next[tech.id!]
        return next
      })
    } else {
      setModalTech(tech)
      setIsModalOpen(true)
    }
  }

  function handleModalConfirm(steps: StackStep[]) {
    if (modalTech) {
      if (steps.length > 0) {
        setSelectedTechs(prev => prev.includes(modalTech.slug) ? prev : [...prev, modalTech.slug])
        setTechStepsMap(prev => ({ ...prev, [modalTech.id!]: steps }))
      } else {
        setSelectedTechs(prev => prev.filter(s => s !== modalTech.slug))
        setTechStepsMap(prev => {
          const next = { ...prev }
          delete next[modalTech.id!]
          return next
        })
      }
    }
    setIsModalOpen(false)
    setModalTech(null)
  }

  const steps: StackStep[] = selectedTechs.flatMap(slug => {
    const tech = initialTechnologies.find(t => t.slug === slug)
    return tech && tech.id ? (techStepsMap[tech.id] || []) : []
  })

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
          {selectedTechs.length > 0 && (
            <button
              onClick={() => {
                setSelectedTechs([])
                setTechStepsMap({})
              }}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Limpar escolhas
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {initialTechnologies.map((tech) => {
            const active = selectedTechs.includes(tech.slug)
            return (
              <button
                key={tech.slug}
                type="button"
                onClick={() => handleTechClick(tech)}
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

      <TechCommandsModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setModalTech(null)
        }}
        tech={modalTech}
        commands={
          modalTech 
            ? (() => {
                const dbCommands = allCommands.filter(c => c.tech.id === modalTech.id)
                if (dbCommands.length > 0) return dbCommands
                
                // Fallback para recipes hardcoded caso nao haja comandos no banco
                const fallback = recipes[modalTech.slug]
                if (fallback) {
                  return fallback.map((step, idx) => ({
                    id: `fallback-${idx}`,
                    label: step.title,
                    description: step.description,
                    command: step.command || '',
                    tech: modalTech,
                    whenToUse: '',
                    tags: []
                  } as CommandWithTech))
                }
                return []
              })()
            : []
        }
        onConfirm={handleModalConfirm}
        initialSelectedSteps={modalTech?.id ? techStepsMap[modalTech.id] : []}
      />
    </div>
  )
}
