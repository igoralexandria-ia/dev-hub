'use client'

import { useState } from 'react'
import { Check, ClipboardList } from 'lucide-react'
import type { StackStep } from '@/types/models'
import { CodeSnippet } from '@/components/ui/code-snippet'

interface SetupStepsProps {
  steps: StackStep[]
}

export function SetupSteps({ steps }: SetupStepsProps) {
  const [copiedAll, setCopiedAll] = useState(false)
  const allCommands = steps
    .map((s) => s.command)
    .filter(Boolean)
    .join('\n')

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(allCommands)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Setup passo a passo</h2>
        {allCommands && (
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40"
          >
            {copiedAll ? (
              <Check className="size-4 text-primary" />
            ) : (
              <ClipboardList className="size-4" />
            )}
            {copiedAll ? 'Copiado!' : 'Copiar todos'}
          </button>
        )}
      </div>

      <ol className="mt-5 space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary">
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
              )}
            </div>

            <div className="flex-1 pb-2 min-w-0">
              <h3 className="font-medium text-foreground">{step.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground text-pretty">
                {step.description}
              </p>
              {step.command && (
                <CodeSnippet code={step.command} variant="simple" />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
