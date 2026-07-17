import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getStack, getTechnology, stacks } from '@/lib/data'
import { LevelBadge } from '@/components/level-badge'
import { SetupSteps } from '@/components/setup-steps'
import { FavoriteButton } from '@/components/favorite-button'

export function generateStaticParams() {
  return stacks.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const stack = getStack(slug)
  if (!stack) return { title: 'Stack não encontrada — DevHub' }
  return {
    title: `${stack.name} — DevHub`,
    description: stack.description,
  }
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const stack = getStack(slug)

  if (!stack) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <Link
        href="/stacks"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Todas as stacks
      </Link>

      <header className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-balance">
                {stack.name}
              </h1>
              <LevelBadge level={stack.level} />
            </div>
            <p className="mt-2 text-sm text-card-foreground text-pretty">
              {stack.description}
            </p>
          </div>
          <FavoriteButton type="stack" refId={stack.slug} className="shrink-0" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.technologies.map((techSlug) => {
            const tech = getTechnology(techSlug)
            if (!tech) return null
            return (
              <Link
                key={techSlug}
                href={`/tecnologias/${tech.slug}`}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {tech.name}
              </Link>
            )
          })}
        </div>
      </header>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <SetupSteps steps={stack.steps} />
      </section>
    </main>
  )
}
