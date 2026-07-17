import { Suspense } from 'react'
import { SearchClient } from '@/components/search-client'

export default function BuscaPage() {
  return (
    <Suspense fallback={null}>
      <SearchClient />
    </Suspense>
  )
}
