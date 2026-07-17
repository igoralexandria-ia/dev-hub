import type { Metadata } from 'next'
import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import { stacks } from '@/lib/data'
import { StackCard } from '@/components/stack-card'

export const metadata: Metadata = {
  title: 'Stacks — DevHub',
  description: 'Combinações prontas de tecnologias com setup completo passo a passo.',
}

export default function StacksPage() {
  const ordered = [...stacks].sort((a, b) => b.popularity - a.popularity)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Stacks prontas
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
            Combinações testadas de tecnologias com o setup completo, do zero ao
            primeiro run.
          </p>
        </div>
        <Link
          href="/gerador"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40"
        >
          <Wand2 className="size-4 text-primary" />
          Gerar setup personalizado
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((stack) => (
          <StackCard key={stack.slug} stack={stack} />
        ))}
      </div>
    </main>
  )
}
