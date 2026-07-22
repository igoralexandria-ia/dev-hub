"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react"

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

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="h-14 animate-pulse bg-muted rounded-xl w-full border border-border/50"></div>
  }

  if (session) {
    return (
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border/50 shadow-sm transition-colors hover:bg-card/80">
        <div className="flex items-center gap-3 overflow-hidden">
          {session.user?.image ? (
            <img src={session.user.image} alt="Avatar" className="size-9 rounded-full border border-border" />
          ) : (
            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}
          <div className="text-sm truncate">
            <p className="font-semibold truncate tracking-tight text-foreground">{session.user?.name}</p>
            <p className="text-xs text-muted-foreground truncate opacity-80">{session.user?.email}</p>
          </div>
        </div>
        <button 
          onClick={() => signOut()} 
          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" 
          title="Sair da conta"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn('github')} 
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm cursor-pointer"
    >
      <GithubIcon className="size-4" />
      Entrar com GitHub
    </button>
  )
}
