import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Settings, Heart, TerminalSquare, Box } from 'lucide-react'
import { LogoutButton } from '@/components/logout-button'

export default async function PerfilPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  // Fallback se DB estiver offline ou não conseguir buscar
  let stats = { favorites: 0, copyCount: 0 }
  
  try {
    const favCount = await prisma.favorite.count({
      where: { userId: session.user.id }
    })
    stats.favorites = favCount
  } catch (error) {
    console.warn("DB offline ou erro:", error)
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Seu Perfil
        </h1>
        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card do Usuário */}
        <div className="md:col-span-1 rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center">
          <div className="relative size-24 rounded-full overflow-hidden border-2 border-primary/20 mb-4 bg-muted">
            {session.user.image ? (
              <img src={session.user.image} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
              <div className="flex size-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold text-foreground">{session.user.name}</h2>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
          
          <div className="mt-6 w-full pt-6 border-t border-border/50">
            <button className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer">
              <Settings className="size-4" />
              Configurações
            </button>
          </div>
        </div>

        {/* Estatísticas e Coleções */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                  <Heart className="size-4" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Comandos Salvos</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.favorites}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TerminalSquare className="size-4" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Coleções</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">0</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 min-h-[250px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Suas Coleções</h3>
              <button className="text-sm font-medium text-primary hover:opacity-80 transition-opacity cursor-pointer">
                + Nova Coleção
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Box className="size-10 opacity-20 mb-3" />
              <p className="text-sm">Você ainda não criou nenhuma coleção.</p>
              <p className="text-xs mt-1">Organize seus comandos favoritos em pastas.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
