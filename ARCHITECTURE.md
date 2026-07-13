# Arquitetura do Projeto

Este documento detalha as tecnologias, a estrutura e as decisões de arquitetura adotadas no **DevHub**.

## Stack Tecnológica

O projeto é baseado nas seguintes tecnologias principais:
- **Framework Principal:** [Next.js](https://nextjs.org/) (App Router)
- **Biblioteca UI:** [React](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes Base:** [Shadcn UI](https://ui.shadcn.com/) / Lucide React (ícones)
- **Banco de Dados / ORM (Fase Futura):** PostgreSQL + [Prisma ORM](https://www.prisma.io/)

## Estrutura de Diretórios (Domínios)

O código está organizado priorizando a clareza e a separação de responsabilidades (BFF e Server Components onde possível):

- `app/`: Contém todas as rotas e páginas da aplicação usando o App Router.
  - `app/api/`: Rotas de API que funcionam como o backend da aplicação (BFF - Backend For Frontend).
  - `app/busca/`: Página de resultados de busca.
  - `app/tecnologias/`: Catálogo e detalhes de cada tecnologia.
  - `app/stacks/`: Visualização de combos e stacks.
- `components/`: Componentes visuais isolados e reutilizáveis (botões, inputs, modais, cards).
- `lib/`: Funções utilitárias e, na fase atual, os **dados estáticos (mockados)** do projeto (`data.ts`).
- `prisma/`: (Futuro) Conterá o schema oficial do banco de dados e as migrations.

## Fases de Desenvolvimento

### Fase 1: Foco em UI e UX (Fase Atual)
Neste momento, a prioridade é o desenvolvimento das interfaces, garantindo responsividade, modo escuro e a melhor usabilidade para o desenvolvedor. Para não criar gargalos de infraestrutura, os dados de tecnologias, comandos e stacks estão sendo consumidos de forma **estática** (através da pasta `lib/data.ts`).

### Fase 2: Backend e Persistência
Na próxima fase, conectaremos a aplicação a um banco de dados PostgreSQL usando Prisma.
Modelos planejados:
- `Technology`
- `Command`
- `Stack`
- `User`
- `Favorite`

Os dados estáticos serão migrados para o banco e implementaremos rotas completas na pasta `app/api/` para consumo do lado do cliente e do servidor.
