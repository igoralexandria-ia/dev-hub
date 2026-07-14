"use client"

import { useCallback } from "react"
import useSWR from "swr"

export type FavoriteType = "command" | "stack"

export type Favorite = {
  id: string
  type: FavoriteType
  refId: string
  createdAt: string
}

const ENDPOINT = "/api/favorites"

async function fetcher(url: string): Promise<Favorite[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Falha ao carregar favoritos")
  const data = (await res.json()) as { favorites: Favorite[] }
  return data.favorites
}

export function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR<Favorite[]>(
    ENDPOINT,
    fetcher,
    { revalidateOnFocus: false },
  )

  const favorites = data ?? []

  const isFavorite = useCallback(
    (type: FavoriteType, refId: string) =>
      favorites.some((f) => f.type === type && f.refId === refId),
    [favorites],
  )

  const toggleFavorite = useCallback(
    async (type: FavoriteType, refId: string) => {
      const exists = favorites.some(
        (f) => f.type === type && f.refId === refId,
      )

      // Atualização otimista.
      const optimistic = exists
        ? favorites.filter((f) => !(f.type === type && f.refId === refId))
        : [
            {
              id: `temp-${type}-${refId}`,
              type,
              refId,
              createdAt: new Date().toISOString(),
            },
            ...favorites,
          ]

      await mutate(
        async () => {
          const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, refId }),
          })
          if (!res.ok) throw new Error("Falha ao atualizar favorito")
          const json = (await res.json()) as { favorites: Favorite[] }
          return json.favorites
        },
        { optimisticData: optimistic, rollbackOnError: true, revalidate: false },
      )
    },
    [favorites, mutate],
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading,
    isError: Boolean(error),
  }
}
