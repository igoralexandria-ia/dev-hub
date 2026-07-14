import { cookies } from "next/headers"
import { randomUUID } from "crypto"

const COOKIE_NAME = "devhub_session"

// Retorna o id de sessão existente ou cria um novo (cookie anônimo, sem login).
export async function getOrCreateSessionId(): Promise<string> {
  const store = await cookies()
  const existing = store.get(COOKIE_NAME)?.value
  if (existing) return existing

  const id = randomUUID()
  store.set(COOKIE_NAME, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 ano
  })
  return id
}
