import type { StackStep } from '@/types/models'

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
  'nextauth',
  'shadcnui',
  'materialui',
  'chakraui',
  'flowbite',
  'lucide',
  'fontawesome',
  'googlefonts'
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
  nextauth: [
    {
      title: 'Configurar NextAuth',
      command: 'npm install next-auth @next-auth/prisma-adapter',
      description: 'Instale os pacotes e crie o arquivo app/api/auth/[...nextauth]/route.ts.',
    },
  ],
  shadcnui: [
    {
      title: 'Inicializar Shadcn UI',
      command: 'npx shadcn@latest init',
      description: 'Responda as perguntas de configuração inicial do Shadcn.',
    },
  ],
  materialui: [
    {
      title: 'Instalar Material UI',
      command: 'npm install @mui/material @emotion/react @emotion/styled',
      description: 'Pacotes base do MUI. Se precisar de ícones, instale @mui/icons-material.',
    },
  ],
  chakraui: [
    {
      title: 'Instalar Chakra UI',
      command: 'npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion',
      description: 'Configure o ChakraProvider na raiz da sua aplicação após a instalação.',
    },
  ],
  flowbite: [
    {
      title: 'Instalar Flowbite',
      command: 'npm install flowbite flowbite-react',
      description: 'Adicione o plugin do flowbite no seu tailwind.config.ts.',
    },
  ],
  lucide: [
    {
      title: 'Instalar Lucide Icons',
      command: 'npm install lucide-react',
      description: 'Componentes vetoriais prontos para o React.',
    },
  ],
  fontawesome: [
    {
      title: 'Instalar Font Awesome',
      command: 'npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome',
      description: 'Coleção de ícones sólidos do FontAwesome.',
    },
  ],
  googlefonts: [
    {
      title: 'Usar Google Fonts no Next.js',
      description: 'Use o pacote next/font/google para importar fontes automaticamente no arquivo layout.tsx, sem precisar fazer download manual.',
    },
  ]
}

export function generateSetup(selected: string[]): StackStep[] {
  return order
    .filter((slug) => selected.includes(slug))
    .flatMap((slug) => recipes[slug] ?? [])
}
