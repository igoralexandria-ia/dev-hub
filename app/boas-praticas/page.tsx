import { BookOpen, CheckCircle2, Code2, Database, LayoutTemplate, Settings2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boas Práticas | Dev Hub',
  description: 'Guia de arquitetura, estruturação e padrões de código para diferentes stacks.',
}

export default function BestPracticesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="size-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Boas Práticas & Arquitetura
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Padrões de projeto, estrutura de pastas e guias recomendados pelas documentações oficiais de cada ecossistema.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* React e Next.js */}
        <section className="scroll-mt-20">
          <div className="mb-6 flex items-center gap-3">
            <LayoutTemplate className="size-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">React & Next.js</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Estrutura de Tipagem (TypeScript)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Separe os tipos conforme seu escopo de atuação para evitar dependências cíclicas e poluição global:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Tipos Globais (Domain/Models):</strong> Crie uma pasta <code className="text-primary bg-primary/10 px-1 rounded">types/models.ts</code> apenas para entidades que cruzam toda a aplicação (ex: <code>User</code>, <code>Product</code>).</li>
                <li><strong>Tipos de Componente:</strong> Interfaces de Props (ex: <code>ButtonProps</code>) devem ficar <strong>dentro do próprio arquivo</strong> do componente.</li>
                <li><strong>Tipos de Rotas:</strong> Tipagens de parâmetros de URL no Next.js (como <code>searchParams</code>) ficam diretamente no arquivo <code>page.tsx</code> correspondente.</li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Arquitetura de Pastas
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                A estrutura recomendada para projetos escaláveis:
              </p>
              <pre className="bg-[#0A0A0A] p-4 rounded-lg border border-border/50 text-xs font-mono text-muted-foreground overflow-x-auto">
{`src/
├── app/                  # Rotas, Layouts e Páginas (Next.js App Router)
├── components/
│   ├── ui/               # Componentes burros/genéricos (Botões, Inputs, Cards)
│   └── feature/          # Componentes inteligentes atrelados a regra de negócio
├── lib/                  # Funções utilitárias (utils.ts), configurações globais (prisma, auth)
├── hooks/                # Custom React Hooks
└── types/                # Definições globais de TypeScript`}
              </pre>
            </div>
          </div>
        </section>

        {/* Python e Django */}
        <section className="scroll-mt-20">
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="size-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Python & Django</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Princípios de Design Django (Fat Models, Skinny Views)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Modelos Robustos:</strong> Coloque a regra de negócio e os métodos de validação no <code>models.py</code> ou em <code>services.py</code>. Modelos devem saber como salvar e validar a si mesmos.</li>
                <li><strong>Views Enxutas:</strong> Suas views devem apenas tratar o ciclo Request-Response. Receber a requisição, chamar o modelo/serviço para executar a ação e retornar a resposta.</li>
                <li><strong>Apps Desacoplados:</strong> Crie um novo app django (<code>python manage.py startapp</code>) sempre que tiver um domínio lógico independente (ex: <code>users</code>, <code>orders</code>, <code>inventory</code>).</li>
                <li><strong>Ambientes Isolados:</strong> Sempre utilize <code>venv</code> ou <code>poetry</code>. Nunca instale dependências globalmente no sistema.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Java */}
        <section className="scroll-mt-20">
          <div className="mb-6 flex items-center gap-3">
            <Settings2 className="size-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Java & Spring Boot</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Arquitetura e Injeção de Dependências
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Camadas Claras:</strong> Siga a separação clássica: <code>Controllers</code> (Endpoints) {'>'} <code>Services</code> (Regras de Negócio) {'>'} <code>Repositories</code> (Acesso a Banco).</li>
                <li><strong>Inversão de Controle:</strong> Utilize injeção via construtor com o <code>@RequiredArgsConstructor</code> (do Lombok) em vez de usar <code>@Autowired</code> em atributos.</li>
                <li><strong>DTOs (Data Transfer Objects):</strong> Nunca retorne ou receba Entidades do banco diretamente nos Controllers. Sempre mapeie para DTOs (RequestDTO/ResponseDTO) para evitar vazamento de dados sensíveis e lazy-loading exceptions.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Banco de Dados */}
        <section className="scroll-mt-20">
          <div className="mb-6 flex items-center gap-3">
            <Database className="size-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Banco de Dados (SQL & NoSQL)</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                PostgreSQL, MySQL & MariaDB
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Normalização x Desnormalização:</strong> Normalize (até a 3ª forma normal) para evitar duplicação. Desnormalize apenas quando houver gargalos de leitura críticos onde joins são inviáveis.</li>
                <li><strong>Índices Inteligentes:</strong> Crie índices nas colunas que são frequentemente usadas em cláusulas <code>WHERE</code>, <code>JOIN</code> ou <code>ORDER BY</code>. Cuidado com índices em tabelas de muita escrita.</li>
                <li><strong>UUIDs vs Auto Increment:</strong> Use IDs sequenciais inteiros para chaves primárias internas (mais rápido para indexar) e adicione uma coluna UUID (ex: <code>public_id</code>) se precisar expor o ID na URL, evitando que usuários deduzam o tamanho da sua base.</li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Prisma ORM
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Reuso da Conexão:</strong> Em frameworks Serverless (como Next.js), instancie o PrismaClient uma única vez globalmente para evitar o esgotamento do pool de conexões (Too many connections).</li>
                <li><strong>Select Otimizado:</strong> Em consultas pesadas, utilize a cláusula <code>select</code> no prisma para trazer apenas os campos necessários, reduzindo uso de memória.</li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                MongoDB
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/90 list-disc pl-5">
                <li><strong>Dados Juntos:</strong> O que é lido junto, deve ser armazenado junto (Embedding). Incorpore documentos filhos dentro do pai a menos que a matriz possa crescer infinitamente.</li>
                <li><strong>Referências vs Incorporação:</strong> Se a relação for N-para-M gigante, use referências (ObjectIDs). Se for uma lista pequena e imutável (como "endereços" de um usuário), use incorporação (Embed).</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
