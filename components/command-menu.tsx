'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import useSWR from 'swr'
import { Search, Terminal, Box } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data, isLoading } = useSWR('/api/search', fetcher)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    
    const openMenu = () => setOpen(true)

    document.addEventListener('keydown', down)
    document.addEventListener('open-command-menu', openMenu)
    
    return () => {
      document.removeEventListener('keydown', down)
      document.removeEventListener('open-command-menu', openMenu)
    }
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm px-4" onClick={() => setOpen(false)}>
      <div 
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/50" 
        onClick={e => e.stopPropagation()}
      >
        <Command 
          className="w-full flex flex-col bg-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
        >
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground mr-3" />
            <Command.Input 
              autoFocus 
              placeholder="Buscar tecnologias ou comandos..." 
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {isLoading && (
              <div className="py-6 text-center text-sm text-muted-foreground">Carregando...</div>
            )}
            {!isLoading && <Command.Empty className="py-6 text-center text-sm text-muted-foreground">Nenhum resultado encontrado.</Command.Empty>}

            {data?.technologies && data.technologies.length > 0 && (
              <Command.Group heading={<div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">Tecnologias</div>}>
                {data.technologies.map((tech: any) => (
                  <Command.Item
                    key={`tech-${tech.slug}`}
                    value={tech.name}
                    onSelect={() => {
                      router.push(`/tecnologias/${tech.slug}`)
                      setOpen(false)
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground aria-selected:bg-primary/10 aria-selected:text-primary transition-colors"
                  >
                    <Box className="size-4" />
                    <span>{tech.name}</span>
                    <span className="ml-auto text-xs opacity-50">{tech.category}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {data?.commands && data.commands.length > 0 && (
              <Command.Group heading={<div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">Comandos</div>}>
                {data.commands.map((cmd: any) => (
                  <Command.Item
                    key={`cmd-${cmd.id}`}
                    value={`${cmd.label} ${cmd.techName}`}
                    onSelect={() => {
                      router.push(`/tecnologias/${cmd.techSlug}`)
                      setOpen(false)
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground aria-selected:bg-primary/10 aria-selected:text-primary transition-colors"
                  >
                    <Terminal className="size-4" />
                    <span>{cmd.label}</span>
                    <span className="ml-auto rounded bg-secondary/50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {cmd.techName}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
