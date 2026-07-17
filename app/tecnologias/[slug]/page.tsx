import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getTechnology, technologies } from '@/lib/data'
import { LevelBadge } from '@/components/level-badge'
import { CommandCard } from '@/components/command-card'
import { TutorialCard } from '@/components/tutorial-card'

export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tech = getTechnology(slug)
  if (!tech) return { title: 'Tecnologia não encontrada — DevHub' }
  return {
    title: `${tech.name} — DevHub`,
    description: tech.description,
  }
}

export default async function TecnologiaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tech = getTechnology(slug)

  if (!tech) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Link
        href="/tecnologias"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Todas as tecnologias
      </Link>

      <header className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-white/5 p-2 border border-white/10"
          aria-hidden="true"
        >
          {tech.iconUrl ? (
            <img src={tech.iconUrl} alt={tech.name} className="w-full h-full object-contain" />
          ) : (
            <span className="font-mono text-lg font-semibold text-foreground">
              {tech.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{tech.name}</h1>
            <LevelBadge level={tech.level} />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{tech.category}</p>
          <p className="mt-3 text-sm text-card-foreground text-pretty">
            {tech.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {tech.tags.map((tag) => (
              <Link
                key={tag}
                href={`/busca?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <a
            href={tech.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Documentação oficial
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">
          Comandos principais
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Descrição, quando usar, parâmetros e exemplos práticos.
        </p>
        <div className="mt-5 grid gap-4">
          {tech.commands.map((command) => (
            <CommandCard key={command.id} command={command} />
          ))}
        </div>
      </section>

      {tech.tutorials && tech.tutorials.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-10">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Tutoriais de Instalação do Zero
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-balance">
            Siga o passo a passo para configurar essa tecnologia na sua máquina antes de executar seu primeiro projeto.
          </p>
          <div className="mt-6 grid gap-6">
            {tech.tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
