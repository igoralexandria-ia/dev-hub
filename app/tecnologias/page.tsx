import type { Metadata } from 'next'
import { TechExplorer } from '@/components/tech-explorer'
import { getTechnologies } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Tecnologias — DevHub',
  description: 'Explore frameworks, linguagens e ferramentas com seus principais comandos.',
}

export default async function TecnologiasPage() {
  const technologies = await getTechnologies()
  
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Tecnologias
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
        Frameworks, linguagens e ferramentas com comandos, parâmetros e exemplos
        práticos. Filtre por nível ou categoria.
      </p>

      <div className="mt-8">
        <TechExplorer initialTechnologies={technologies} />
      </div>
    </main>
  )
}
