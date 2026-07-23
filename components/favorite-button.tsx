'use client'

import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useFavorites, type FavoriteType } from '@/lib/use-favorites'
import { useState } from 'react'
import { AuthModal } from '@/components/auth-modal'

export function FavoriteButton({
  type,
  refId,
  className,
}: {
  type: FavoriteType
  refId: string
  className?: string
}) {
  const { status } = useSession()
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(type, refId)

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  function handleClick() {
    if (status === 'unauthenticated') {
      setIsAuthModalOpen(true)
      return
    }
    toggleFavorite(type, refId)
  }

  return (
    <>
      <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={cn(
        'cursor-pointer flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground',
        active && 'border-primary/40 bg-primary/10 text-primary hover:text-primary',
        className,
      )}
    >
        <Heart className={cn('size-4', active && 'fill-current')} />
      </button>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}
