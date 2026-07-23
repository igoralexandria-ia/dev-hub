'use client'

import { Search } from 'lucide-react'

export function GlobalSearch({
  placeholder = 'Buscar tecnologia ou comando... (Ctrl+K)',
}: {
  placeholder?: string
}) {
  function handleClick() {
    document.dispatchEvent(new CustomEvent('open-command-menu'))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Abrir busca global"
      className="group relative flex w-full items-center h-14 rounded-xl border border-border bg-card px-4 text-base text-muted-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-card/80 hover:text-foreground"
    >
      <Search className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      <span className="ml-3 truncate">{placeholder}</span>
      
      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
