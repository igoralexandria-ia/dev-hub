import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getOrCreateSessionId } from "@/lib/session"

export const dynamic = "force-dynamic"

type FavoriteDTO = {
  id: string
  type: string
  refId: string
  createdAt: string
}

function toDTO(row: {
  id: string
  itemType: string
  itemId: string
  createdAt: Date
}): FavoriteDTO {
  return {
    id: row.id,
    type: row.itemType,
    refId: row.itemId,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function GET() {
  const sessionId = await getOrCreateSessionId()
  const rows = await prisma.favorite.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json({ favorites: rows.map(toDTO) })
}

export async function POST(request: Request) {
  const sessionId = await getOrCreateSessionId()

  let body: { type?: string; refId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const { type, refId } = body
  if (
    (type !== "command" && type !== "stack") ||
    typeof refId !== "string" ||
    refId.length === 0
  ) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 })
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      sessionId_itemType_itemId: { sessionId, itemType: type, itemId: refId },
    },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
  } else {
    await prisma.favorite.create({
      data: { sessionId, itemType: type, itemId: refId },
    })
  }

  const rows = await prisma.favorite.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json({ favorites: rows.map(toDTO) })
}
