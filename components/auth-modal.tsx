'use client'

import { X, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'

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

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function AuthModal({ 
  isOpen, 
  onClose,
  title = "Autenticação Necessária",
  description = "Você precisa entrar com sua conta do GitHub para salvar seus comandos favoritos e criar coleções."
}: AuthModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <div className="flex flex-col items-center text-center pt-4">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
            <ShieldAlert className="size-7" />
          </div>
          
          <h2 className="mb-2 text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            {description}
          </p>

          <Button 
            onClick={() => signIn('github')}
            className="w-full flex items-center gap-2 h-11 text-base shadow-sm"
          >
            <GithubIcon className="size-5" />
            Entrar com GitHub
          </Button>
          
          <p className="mt-4 text-xs text-muted-foreground">
            É rápido, seguro e não publicamos nada sem sua permissão.
          </p>
        </div>
      </div>
    </div>
  )
}
