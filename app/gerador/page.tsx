import type { Metadata } from 'next'
import { GeneratorClient } from '@/components/generator-client'
import { getTechnologies, getAllCommandsWithTech } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Gerador de setup — DevHub',
  description: 'Selecione tecnologias e gere um setup passo a passo com comandos prontos.',
}

export default async function GeradorPage() {
  const technologies = await getTechnologies()
  const allCommands = await getAllCommandsWithTech()

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">
          Gerador de Setup
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground text-pretty">
          Monte a combinação ideal de tecnologias e receba os comandos na ordem
          certa, prontos para copiar para o terminal.
        </p>
      </div>
      <div className="mt-8">
        <GeneratorClient 
          initialTechnologies={technologies} 
          allCommands={allCommands}
        />
      </div>
    </main>
  )
}
