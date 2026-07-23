'use client'

import { ReactNode, useState, useMemo, useEffect } from 'react'
import { TerminalSquare } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'

interface CodeSnippetProps {
  code: string
  variant?: 'simple' | 'terminal'
  headerRight?: ReactNode
  prefix?: ReactNode
  title?: string
  commandId?: string
}

export function CodeSnippet({
  code,
  variant = 'simple',
  headerRight,
  prefix = <span className="select-none font-mono text-sm text-primary">$</span>,
  title = 'Terminal',
  commandId,
}: CodeSnippetProps) {
  const variableRegex = /<([^>]+)>/g
  
  const [variables, setVariables] = useState<Record<string, string>>({})

  useEffect(() => {
    const matches = Array.from(code.matchAll(variableRegex))
    const initialVars: Record<string, string> = {}
    matches.forEach(match => {
      if (!(match[1] in initialVars)) {
        initialVars[match[1]] = ''
      }
    })
    setVariables(initialVars)
  }, [code])

  const finalCode = useMemo(() => {
    return code.replace(variableRegex, (match, varName) => {
      return variables[varName] || match
    })
  }, [code, variables])

  const renderCodeWithInputs = () => {
    const parts = []
    let lastIndex = 0
    const matches = Array.from(code.matchAll(variableRegex))

    matches.forEach((match, index) => {
      if (match.index! > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>{code.substring(lastIndex, match.index)}</span>
        )
      }

      const varName = match[1]
      parts.push(
        <input
          key={`var-${index}-${varName}`}
          type="text"
          placeholder={varName}
          value={variables[varName] || ''}
          onChange={(e) => setVariables(prev => ({ ...prev, [varName]: e.target.value.replace(/\s/g, '-') }))}
          className="mx-1 inline-block h-6 min-w-[100px] w-auto max-w-[200px] rounded border border-primary/40 bg-primary/10 px-2 font-mono text-xs text-primary placeholder:text-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          style={{ width: `${Math.max((variables[varName]?.length || varName.length) + 2, 8)}ch` }}
        />
      )

      lastIndex = match.index! + match[0].length
    })

    if (lastIndex < code.length) {
      parts.push(<span key="text-end">{code.substring(lastIndex)}</span>)
    }

    if (parts.length === 0) return <span>{code}</span>
    return <>{parts}</>
  }

  if (variant === 'simple') {
    return (
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background/60 p-2 overflow-x-auto">
        <div className="flex items-center gap-2 flex-1 whitespace-nowrap min-w-max">
          {prefix}
          <code className="font-mono text-sm text-foreground flex items-center">
            {renderCodeWithInputs()}
          </code>
        </div>
        <div className="sticky right-0 bg-background/60 pl-2 backdrop-blur-sm">
          <CopyButton value={finalCode} commandId={commandId} className="shrink-0" />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-border/50 bg-[#0A0A0A] shadow-inner">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5 shrink-0">
          <div className="size-2.5 rounded-full bg-rose-500/80" />
          <div className="size-2.5 rounded-full bg-amber-500/80" />
          <div className="size-2.5 rounded-full bg-emerald-500/80" />
        </div>
        
        {headerRight ? (
          headerRight
        ) : (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TerminalSquare className="size-3.5" />
            <span className="text-[10px] font-medium uppercase tracking-widest">
              {title}
            </span>
          </div>
        )}

        <div className="flex justify-end shrink-0">
          <CopyButton
            value={finalCode}
            commandId={commandId}
            className="size-6 bg-transparent hover:bg-white/10 text-muted-foreground hover:text-white cursor-pointer"
          />
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          {prefix}
          <code className="flex-1 font-mono text-sm text-gray-200 flex items-center">
            {renderCodeWithInputs()}
          </code>
        </div>
      </div>
    </div>
  )
}
