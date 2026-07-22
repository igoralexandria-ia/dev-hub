import { ReactNode } from 'react'
import { TerminalSquare } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'

interface CodeSnippetProps {
  code: string
  variant?: 'simple' | 'terminal'
  headerRight?: ReactNode
  prefix?: ReactNode
  title?: string
}

export function CodeSnippet({
  code,
  variant = 'simple',
  headerRight,
  prefix = <span className="select-none font-mono text-sm text-primary">$</span>,
  title = 'Terminal',
}: CodeSnippetProps) {
  if (variant === 'simple') {
    return (
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background/60 p-2">
        {prefix}
        <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
          {code}
        </code>
        <CopyButton value={code} className="shrink-0" />
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
            value={code}
            className="size-6 bg-transparent hover:bg-white/10 text-muted-foreground hover:text-white cursor-pointer"
          />
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <div className="flex items-center gap-3">
          {prefix}
          <code className="flex-1 font-mono text-sm text-gray-200">{code}</code>
        </div>
      </div>
    </div>
  )
}
