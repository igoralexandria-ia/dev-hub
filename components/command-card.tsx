'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Info, Lightbulb, Monitor, Apple, Command as CommandIcon } from 'lucide-react'
import type { Command, Technology } from '@/lib/data'
import { CopyButton } from '@/components/copy-button'
import { FavoriteButton } from '@/components/favorite-button'
import { cn } from '@/lib/utils'

type OsType = 'windows' | 'mac' | 'linux'

export function CommandCard({
  command,
  tech,
  showTech = false,
}: {
  command: Command
  tech?: Technology
  showTech?: boolean
}) {
  const [activeOs, setActiveOs] = useState<OsType>('windows')

  const isOsCommand = typeof command.command === 'object'
  
  // Resolve which string to show based on state and availability
  let displayCommandStr = ''
  if (!isOsCommand) {
    displayCommandStr = command.command as string
  } else {
    const osCmd = command.command as any
    displayCommandStr = osCmd[activeOs] || osCmd.default
  }

  return (
    <div className="glass-card flex flex-col p-5 relative overflow-hidden group/card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground text-lg tracking-tight">{command.label}</h3>
            {showTech && tech && (
              <Link
                href={`/tecnologias/${tech.slug}`}
                className="cursor-pointer rounded-full bg-secondary/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {tech.name}
              </Link>
            )}
          </div>
          <p className="text-sm text-muted-foreground/90 text-pretty leading-relaxed">
            {command.description}
          </p>
        </div>
        <div className="rounded-full bg-background/50 p-1 shadow-sm">
          <FavoriteButton type="command" refId={command.id} className="shrink-0 size-8 cursor-pointer" />
        </div>
      </div>

      {/* Terminal Block */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border/50 bg-[#0A0A0A] shadow-inner">
        {/* Window Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5 shrink-0">
            <div className="size-2.5 rounded-full bg-rose-500/80" />
            <div className="size-2.5 rounded-full bg-amber-500/80" />
            <div className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {/* OS Tabs */}
          <div className="flex bg-black/20 p-0.5 rounded-md border border-white/5">
            {(['windows', 'mac', 'linux'] as OsType[]).map((os) => {
              return (
                <button
                  key={os}
                  onClick={() => setActiveOs(os)}
                  className={cn(
                    "cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-all",
                    activeOs === os 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/5"
                  )}
                >
                  {os === 'windows' && <Monitor className="size-3" />}
                  {os === 'mac' && <Apple className="size-3" />}
                  {os === 'linux' && <CommandIcon className="size-3" />}
                  {os}
                </button>
              )
            })}
          </div>

          <div className="w-10 flex justify-end shrink-0">
             <CopyButton value={displayCommandStr} className="size-6 bg-transparent hover:bg-white/10 text-muted-foreground hover:text-white cursor-pointer" />
          </div>
        </div>
        {/* Code Area */}
        <div className="p-4 overflow-x-auto">
          <div className="flex items-center gap-3">
            <span className="select-none font-mono text-sm text-emerald-400">➜</span>
            <span className="select-none font-mono text-sm text-cyan-400">~</span>
            <code className="flex-1 font-mono text-sm text-gray-200">
              {displayCommandStr}
            </code>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <Info className="size-3" strokeWidth={3} />
          </div>
          <p className="leading-relaxed text-muted-foreground/90">
            <span className="font-semibold text-foreground mr-1">Quando usar:</span>
            {command.whenToUse}
          </p>
        </div>

        {command.example && (
          <div className="flex items-start gap-2.5 text-sm">
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <Lightbulb className="size-3" strokeWidth={3} />
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-foreground mr-1">Exemplo:</span>
              <code className="rounded border border-border/50 bg-muted/30 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {command.example}
              </code>
            </div>
          </div>
        )}
      </div>

      {command.options && command.options.length > 0 && (
        <div className="mt-4 rounded-xl border border-border/50 bg-background/30 p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
            Parâmetros Adicionais
          </p>
          <ul className="space-y-2">
            {command.options.map((opt) => (
              <li key={opt.flag} className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
                <code className="w-fit rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary shadow-sm">
                  {opt.flag}
                </code>
                <span className="text-muted-foreground/90">{opt.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
