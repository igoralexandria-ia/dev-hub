'use client'

import { useState } from 'react'
import { Monitor, Apple, Command as CommandIcon, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tutorial, OsCommand } from '@/types/models'
import { CodeSnippet } from '@/components/ui/code-snippet'

type OsType = 'windows' | 'mac' | 'linux'

interface TutorialCardProps {
  tutorial: Tutorial
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const [activeOs, setActiveOs] = useState<OsType>('windows')

  const steps = tutorial.content[activeOs] || []

  function renderCommandStr(command?: string | OsCommand) {
    if (!command) return ''
    if (typeof command === 'string') return command
    return command[activeOs] || command.default
  }

  return (
    <div className="rounded-2xl border border-border bg-background/50 overflow-hidden shadow-sm">
      {/* Header com as Abas de OS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 bg-card/50 p-4 sm:px-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground tracking-tight">{tutorial.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{tutorial.description}</p>
        </div>

        <div className="flex shrink-0 bg-background/50 p-1 rounded-lg border border-border/50 shadow-inner">
          {(['windows', 'mac', 'linux'] as OsType[]).map((os) => {
            const hasSteps = tutorial.content[os] && tutorial.content[os].length > 0
            if (!hasSteps) return null

            return (
              <button
                key={os}
                onClick={() => setActiveOs(os)}
                className={cn(
                  "cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all",
                  activeOs === os 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {os === 'windows' && <Monitor className="size-3.5" />}
                {os === 'mac' && <Apple className="size-3.5" />}
                {os === 'linux' && <CommandIcon className="size-3.5" />}
                {os}
              </button>
            )
          })}
        </div>
      </div>

      {/* Lista de Passos */}
      <div className="p-4 sm:p-6">
        {steps.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Nenhum passo definido para este sistema operacional.
          </div>
        ) : (
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative pl-8">
                {/* Linha conectora */}
                {idx !== steps.length - 1 && (
                  <div className="absolute left-[11px] top-7 bottom-[-24px] w-px bg-border" />
                )}
                
                {/* Círculo do número */}
                <div className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-[10px] font-bold text-primary shadow-sm">
                  {idx + 1}
                </div>

                <div className="mb-1">
                  <h4 className="font-semibold text-foreground tracking-tight">{step.title}</h4>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>

                {step.command && (
                  <CodeSnippet
                    code={renderCommandStr(step.command)}
                    variant="terminal"
                    title="Terminal"
                    prefix={<span className="select-none font-mono text-sm text-emerald-400">➜</span>}
                  />
                )}

                {/* Exibição do Link se existir */}
                {step.link && (
                  <div className="mt-3">
                    <a
                      href={step.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 border border-primary/20 shadow-sm"
                    >
                      <Download className="size-4" />
                      {step.link.label}
                      <ExternalLink className="size-3 opacity-50 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
