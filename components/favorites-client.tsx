'use client'

import Link from 'next/link'
import { Heart, Loader2 } from 'lucide-react'
import { useSession, signIn } from 'next-auth/react'
import { useFavorites } from '@/lib/use-favorites'
import { allCommands, getStack } from '@/lib/data'
import { CommandCard } from '@/components/command-card'
import { StackCard } from '@/components/stack-card'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

export function FavoritesClient() {
  const { status } = useSession()
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

      {status === 'loading' || (status === 'authenticated' && isLoading) ? (
        <div className="mt-16 flex flex-col items-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <p className="mt-3 text-sm">Carregando favoritos...</p>
        </div>
      ) : null}

      {status === 'unauthenticated' && (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Heart className="size-6" />
          </div>
          <h2 className="text-xl font-medium text-foreground">
            Faça login para salvar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm text-pretty">
            Crie sua conta gratuitamente com o GitHub para salvar suas tecnologias e comandos favoritos.
          </p>
          <button
            onClick={() => signIn('github')}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm cursor-pointer"
          >
            <GithubIcon className="size-4" />
            Entrar com GitHub
          </button>
        </div>
      )}

      {status === 'authenticated' && isEmpty && (
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
