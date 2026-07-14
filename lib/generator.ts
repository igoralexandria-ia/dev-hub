import type { StackStep } from '@/lib/data'

// Ordem lógica de aplicação dos passos de setup
const order = [
  'nextjs',
  'react',
  'nodejs',
  'python',
  'typescript',
  'tailwindcss',
  'express',
  'prisma',
  'postgresql',
  'docker',
]

const recipes: Record<string, StackStep[]> = {
  nextjs: [
    {
      title: 'Criar o projeto Next.js',
      command: 'npx create-next-app@latest meu-app --typescript --tailwind --app',
      description: 'Scaffold com TypeScript, Tailwind e App Router. Entre na pasta com "cd meu-app".',
    },
  ],
  react: [
    {
      title: 'Criar o projeto React com Vite',
      command: 'npm create vite@latest meu-app -- --template react-ts',
      description: 'SPA React com TypeScript. Depois rode "cd meu-app && npm install".',
    },
  ],
  nodejs: [
    {
      title: 'Inicializar o projeto Node.js',
      command: 'npm init -y',
      description: 'Cria o package.json base do projeto.',
    },
  ],
  python: [
    {
      title: 'Criar ambiente virtual Python',
      command: 'python -m venv .venv && source .venv/bin/activate',
      description: 'Isola as dependências do projeto Python.',
    },
  ],
  typescript: [
    {
      title: 'Adicionar TypeScript',
      command: 'npm install -D typescript @types/node && npx tsc --init',
      description: 'Instala o compilador e gera o tsconfig.json.',
    },
  ],
  tailwindcss: [
    {
      title: 'Instalar Tailwind CSS',
      command: 'npm install tailwindcss @tailwindcss/postcss',
      description: 'Adicione "@import \\"tailwindcss\\";" ao seu CSS principal em seguida.',
    },
  ],
  express: [
    {
      title: 'Instalar Express',
      command: 'npm install express',
      description: 'Framework web para criar a API REST.',
    },
  ],
  prisma: [
    {
      title: 'Instalar e inicializar o Prisma',
      command: 'npm install -D prisma && npx prisma init --datasource-provider postgresql',
      description: 'Cria o schema.prisma e o arquivo .env.',
    },
    {
      title: 'Aplicar a primeira migration',
      command: 'npx prisma migrate dev --name init',
      description: 'Gera as tabelas no banco a partir do schema.',
    },
  ],
  postgresql: [
    {
      title: 'Criar o banco PostgreSQL',
      command: 'createdb meu_banco',
      description: 'Crie o banco local e ajuste a DATABASE_URL no .env.',
    },
  ],
  docker: [
    {
      title: 'Subir serviços com Docker',
      command: 'docker compose up -d',
      description: 'Orquestre app e banco em containers (requer docker-compose.yml).',
    },
  ],
}

export function generateSetup(selected: string[]): StackStep[] {
  return order
    .filter((slug) => selected.includes(slug))
    .flatMap((slug) => recipes[slug] ?? [])
}
