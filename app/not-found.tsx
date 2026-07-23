import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-8 animate-pulse">
        <Sparkles className="size-10" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        Página não encontrada
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md text-balance mb-8">
        Ops! Parece que o comando que você tentou executar falhou. A página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/">
        <Button size="lg" className="px-8 font-semibold cursor-pointer">
          Voltar para a Home
        </Button>
      </Link>
    </div>
  )
}
