import { PrismaClient } from '@prisma/client'
import { technologies } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando o Seed do Banco de Dados...')
  
  // Limpa o banco para evitar duplicatas em testes
  await prisma.favorite.deleteMany()
  await prisma.command.deleteMany()
  await prisma.technology.deleteMany()
  console.log('Banco de dados limpo.')

  for (const tech of technologies) {
    const createdTech = await prisma.technology.create({
      data: {
        slug: tech.slug,
        name: tech.name,
        category: tech.category,
        tagline: tech.tagline,
        description: tech.description,
        level: tech.level,
        color: tech.color,
        iconUrl: tech.iconUrl,
        tags: tech.tags,
        docsUrl: tech.docsUrl,
        tutorials: tech.tutorials ? (tech.tutorials as any) : null,
      },
    })
    console.log(`Tecnologia criada: ${createdTech.name}`)

    for (const cmd of tech.commands) {
      await prisma.command.create({
        data: {
          commandId: cmd.id,
          label: cmd.label,
          command: cmd.command as any,
          description: cmd.description,
          whenToUse: cmd.whenToUse,
          options: cmd.options ? (cmd.options as any) : null,
          example: cmd.example || null,
          tags: cmd.tags,
          techId: createdTech.id,
        },
      })
      console.log(`  - Comando adicionado: ${cmd.label}`)
    }
  }

  console.log('Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
