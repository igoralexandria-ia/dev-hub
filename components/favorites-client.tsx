'use client'

import Link from 'next/link'
import { Heart, Loader2 } from 'lucide-react'
import { useFavorites } from '@/lib/use-favorites'
import { allCommands, getStack } from '@/lib/data'
import { CommandCard } from '@/components/command-card'
import { StackCard } from '@/components/stack-card'

export function FavoritesClient() {
  const { favorites, isLoading } = useFavorites()

  const favCommands = favorites
    .filter((f) => f.type === 'command')
    .map((f) => allCommands.find((c) => c.id === f.refId))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  const favStacks = favorites
    .filter((f) => f.type === 'stack')
    .map((f) => getStack(f.refId))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const isEmpty = !isLoading && favCommands.length === 0 && favStacks.length === 0

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Favoritos
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Seus comandos e stacks salvos para acesso rápido.
      </p>

      {isLoading && (
        <div className="mt-16 flex flex-col items-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <p className="mt-3 text-sm">Carregando favoritos...</p>
        </div>
      )}

      {isEmpty && (
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <Heart className="size-10" />
          <p className="mt-4 text-sm">
            Você ainda não salvou nada. Toque no coração em qualquer comando ou
            stack para salvar aqui.
          </p>
          <Link
            href="/tecnologias"
            className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explorar tecnologias
          </Link>
        </div>
      )}

      {favStacks.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Stacks salvas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favStacks.map((stack) => (
              <StackCard key={stack.slug} stack={stack} />
            ))}
          </div>
        </section>
      )}

      {favCommands.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Comandos salvos</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {favCommands.map((command) => (
              <CommandCard
                key={command.id}
                command={command}
                tech={command.tech}
                showTech
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
