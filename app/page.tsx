'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Terminal, Layers, Boxes } from 'lucide-react'
import { GlobalSearch } from '@/components/global-search'
import { TechCard } from '@/components/tech-card'
import { StackCard } from '@/components/stack-card'
import { CommandCard } from '@/components/command-card'
import {
  technologies,
  stacks,
  popularCommands,
  allCommands,
} from '@/lib/data'

const quickTags = ['next', 'react', 'python', 'prisma', 'windows', 'docker']

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const topStacks = [...stacks].sort((a, b) => b.popularity - a.popularity).slice(0, 3)
  const featuredTech = technologies.slice(0, 8)

  const displayedCommands = activeFilter 
    ? popularCommands.filter(cmd => cmd.tags.includes(activeFilter))
    : popularCommands

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      {/* Hero */}
      <section className="relative flex flex-col items-center py-20 text-center sm:py-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          O canivete suíço do desenvolvedor moderno
        </span>
        <h1 className="relative z-10 mt-8 max-w-4xl text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          Encontre como iniciar qualquer projeto em <span className="text-gradient">segundos</span>
        </h1>
        <p className="relative z-10 mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl leading-relaxed">
          O DevHub centraliza comandos, configurações e stacks prontas das
          tecnologias que você usa todos os dias. Chega de ler documentações imensas para o básico.
        </p>

        <div className="mt-8 w-full max-w-2xl relative z-10">
          <GlobalSearch />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Populares:</span>
            {quickTags.map((tag) => (
              <Link
                key={tag}
                href={`/busca?q=${encodeURIComponent(tag)}`}
                className="cursor-pointer rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <dl className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 relative z-10">
          <Stat icon={Boxes} value={technologies.length} label="Tecnologias" />
          <Stat icon={Terminal} value={allCommands.length} label="Comandos" />
          <Stat icon={Layers} value={stacks.length} label="Stacks prontas" />
        </dl>
      </section>

      {/* Stacks populares */}
      <section className="py-8">
        <SectionHeader
          title="Stacks populares"
          description="Combinações prontas para começar um projeto completo."
          href="/stacks"
          linkLabel="Ver todas"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topStacks.map((stack) => (
            <StackCard key={stack.slug} stack={stack} />
          ))}
        </div>
      </section>

      {/* Mais usados */}
      <section className="py-8">
        <SectionHeader
          title={activeFilter ? `Comandos Populares: ${activeFilter}` : "Comandos mais usados"}
          description={activeFilter ? "Resultados filtrados para a sua seleção." : "Os comandos que os desenvolvedores mais consultam."}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {displayedCommands.length > 0 ? (
            displayedCommands.map((command) => (
              <CommandCard
                key={command.id}
                command={command}
                tech={command.tech}
                showTech
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground glass-card rounded-xl">
              Nenhum comando popular encontrado para o filtro "{activeFilter}".
            </div>
          )}
        </div>
      </section>

      {/* Tecnologias */}
      <section className="py-8">
        <SectionHeader
          title="Explorar tecnologias"
          description="Navegue por frameworks, linguagens e ferramentas."
          href="/tecnologias"
          linkLabel="Ver todas"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTech.map((tech) => (
            <TechCard key={tech.slug} tech={tech} />
          ))}
        </div>
      </section>
    </main>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  label: string
}) {
  return (
    <div className="glass-card flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <dd className="font-mono text-3xl font-bold text-foreground">
        {value}
      </dd>
      <dt className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
    </div>
  )
}

function SectionHeader({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string
  description: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}
