'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LogoutButton({ className }: { className?: string }) {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 cursor-pointer",
        className
      )}
    >
      <LogOut className="size-4" />
      Sair da conta
    </button>
  )
}
