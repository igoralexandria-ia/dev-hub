'use server'

import { prisma } from '@/lib/prisma'
import type { Technology, Stack, CommandWithTech } from '@/types/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function getTechnologies(): Promise<Technology[]> {
  const techs = await prisma.technology.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  
  return techs.map(tech => ({
    ...tech,
    commands: [],
    tutorials: tech.tutorials ? (tech.tutorials as any) : undefined
  })) as unknown as Technology[]
}

export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
  const tech = await prisma.technology.findUnique({
    where: { slug }
  })
  
  if (!tech) return null
  
  return {
    ...tech,
    commands: [],
    tutorials: tech.tutorials ? (tech.tutorials as any) : undefined
  } as unknown as Technology
}

export async function getCommandsByTechSlug(slug: string): Promise<CommandWithTech[]> {
  const tech = await prisma.technology.findUnique({
    where: { slug },
    include: {
      commands: true
    }
  })
  
  if (!tech) return []
  
  return tech.commands.map(cmd => ({
    id: cmd.id,
    label: cmd.label,
    command: cmd.command as any,
    description: cmd.description,
    whenToUse: cmd.whenToUse,
    options: cmd.options ? (cmd.options as any) : undefined,
    example: cmd.example || undefined,
    tags: cmd.tags,
    tech: {
      ...tech,
      commands: [],
      tutorials: tech.tutorials ? (tech.tutorials as any) : undefined
    } as unknown as Technology
  })) as unknown as CommandWithTech[]
}

export async function getAllCommandsWithTech(): Promise<CommandWithTech[]> {
  const commands = await prisma.command.findMany({
    include: {
      tech: true
    }
  })
  
  return commands.map(cmd => ({
    id: cmd.id,
    label: cmd.label,
    command: cmd.command as any,
    description: cmd.description,
    whenToUse: cmd.whenToUse,
    options: cmd.options ? (cmd.options as any) : undefined,
    example: cmd.example || undefined,
    tags: cmd.tags,
    tech: {
      ...cmd.tech,
      commands: [],
      tutorials: cmd.tech.tutorials ? (cmd.tech.tutorials as any) : undefined
    } as unknown as Technology
  })) as unknown as CommandWithTech[]
}

import { stacks as staticStacks } from '@/lib/data'

export async function getStacks(): Promise<Stack[]> {
  return staticStacks
}

export async function getStackBySlug(slug: string): Promise<Stack | undefined> {
  return staticStacks.find(s => s.slug === slug)
}

export async function incrementCommandCopyCount(commandId: string) {
  try {
    await prisma.command.update({
      where: { id: commandId },
      data: { copyCount: { increment: 1 } }
    })
  } catch (error) {
    console.error('Failed to increment copy count', error)
  }
}

export async function submitContribution(data: {
  type: string
  techId?: string
  otherTech?: string
  title: string
  content: string
  description?: string
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: 'Você precisa estar logado para enviar uma sugestão.' }
  }

  try {
    await prisma.submission.create({
      data: {
        type: data.type,
        techId: data.techId,
        otherTech: data.otherTech,
        title: data.title,
        content: data.content,
        description: data.description,
        userId: session.user.id,
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Falha ao salvar submissão:', error)
    return { error: 'Falha ao salvar no banco de dados.' }
  }
}

// ==========================================
// ADMIN ACTIONS
// ==========================================

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized')
  }
}

export async function getPendingSubmissions() {
  await requireAdmin()
  
  const submissions = await prisma.submission.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })
  
  return submissions
}

export async function rejectSubmission(submissionId: string) {
  await requireAdmin()
  
  try {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'REJECTED' }
    })
    return { success: true }
  } catch (err) {
    return { error: 'Falha ao rejeitar submissão.' }
  }
}

export async function approveCommandSubmission(data: {
  submissionId: string
  techId: string
  commandId: string
  label: string
  command: string
  description: string
  whenToUse: string
  tags: string[]
  example?: string
  options?: any
}) {
  await requireAdmin()
  
  try {
    await prisma.$transaction(async (tx) => {
      await tx.command.create({
        data: {
          commandId: data.commandId,
          label: data.label,
          command: data.command,
          description: data.description,
          whenToUse: data.whenToUse,
          example: data.example,
          options: data.options,
          tags: data.tags,
          techId: data.techId,
        }
      })
      
      await tx.submission.update({
        where: { id: data.submissionId },
        data: { status: 'APPROVED' }
      })
    })
    
    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: 'Falha ao aprovar submissão.' }
  }
}
