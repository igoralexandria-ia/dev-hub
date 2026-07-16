'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SearchX } from 'lucide-react'
import { search } from '@/lib/search'
import { TechCard } from '@/components/tech-card'
import { StackCard } from '@/components/stack-card'
import { CommandCard } from '@/components/command-card'

export function SearchClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initial = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initial)

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  // Keep the URL in sync (shallow) as the user types
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query.trim())
      const next = params.toString()
      const current = searchParams.toString()
      if (next !== current) {
        router.replace(next ? `/busca?${next}` : '/busca', { scroll: false })
      }
    }, 250)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const results = useMemo(() => search(query), [query])
  const hasQuery = query.trim().length > 0

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Busca</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Busque por tecnologia (ex: &quot;next&quot;) ou por ação (ex:
        &quot;instalar&quot;, &quot;configurar&quot;).
      </p>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="Digite para filtrar..."
          aria-label="Busca"
          className="h-14 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
        />
      </div>

      {hasQuery && (
        <p className="mt-4 text-sm text-muted-foreground">
          {results.total}{' '}
          {results.total === 1 ? 'resultado encontrado' : 'resultados encontrados'} para{' '}
          <span className="font-mono text-foreground">&quot;{query.trim()}&quot;</span>
        </p>
      )}

      {!hasQuery && (
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <Search className="size-10" />
          <p className="mt-4 text-sm">Comece a digitar para ver os resultados.</p>
        </div>
      )}

      {hasQuery && results.total === 0 && (
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <SearchX className="size-10" />
          <p className="mt-4 text-sm">
            Nenhum resultado para{' '}
            <span className="font-mono text-foreground">&quot;{query.trim()}&quot;</span>.
          </p>
        </div>
      )}

      {hasQuery && results.technologies.length > 0 && (
        <ResultSection title="Tecnologias" count={results.technologies.length}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.technologies.map((tech) => (
              <TechCard key={tech.slug} tech={tech} />
            ))}
          </div>
        </ResultSection>
      )}

      {hasQuery && results.stacks.length > 0 && (
        <ResultSection title="Stacks" count={results.stacks.length}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.stacks.map((stack) => (
              <StackCard key={stack.slug} stack={stack} />
            ))}
          </div>
        </ResultSection>
      )}

      {hasQuery && results.commands.length > 0 && (
        <ResultSection title="Comandos" count={results.commands.length}>
          <div className="grid gap-4 lg:grid-cols-2">
            {results.commands.map((command) => (
              <CommandCard
                key={command.id}
                command={command}
                tech={command.tech}
                showTech
              />
            ))}
          </div>
        </ResultSection>
      )}
    </main>
  )
}

function ResultSection({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        {title}
        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
          {count}
        </span>
      </h2>
      {children}
    </section>
  )
}
