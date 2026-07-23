import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ favorites: [] })
  }

  const rows = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { command: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ 
    favorites: rows.map(row => ({
      id: row.id,
      type: "command",
      refId: row.command.commandId,
      createdAt: row.createdAt.toISOString()
    })) 
  })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { type?: string; refId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const { type, refId } = body
  if (type !== "command" || typeof refId !== "string" || refId.length === 0) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 })
  }

  const command = await prisma.command.findUnique({
    where: { id: refId }
  })

  if (!command) {
    return NextResponse.json({ error: "Comando não encontrado no banco de dados. Por favor, execute o seed." }, { status: 404 })
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_commandId: { userId: session.user.id, commandId: command.id },
    },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
  } else {
    await prisma.favorite.create({
      data: { userId: session.user.id, commandId: command.id },
    })
  }

  const rows = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { command: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ 
    favorites: rows.map(row => ({
      id: row.id,
      type: "command",
      refId: row.command.commandId,
      createdAt: row.createdAt.toISOString()
    })) 
  })
}
