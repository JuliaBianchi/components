import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Converte string no formato brasileiro ("1.234,56") para float (1234.56). */
export function parseFloat(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".")
  return Number(normalized)
}

export type AppEnv = "development" | "uat" | "production"

/**
 * Retorna o ambiente atual: "development", "uat" ou "production".
 *
 * - "development" → `next dev` (NODE_ENV === "development")
 * - "uat"         → defina NEXT_PUBLIC_APP_ENV=uat no servidor de UAT
 * - "production"  → build em produção sem a variável acima
 */
export function getEnv(): AppEnv {
  if (process.env.NODE_ENV === "development") return "development"
  if (process.env.NEXT_PUBLIC_APP_ENV === "uat") return "uat"
  return "production"
}

// ---------------------------------------------------------------------------
// Como configurar NEXT_PUBLIC_APP_ENV por ambiente
// ---------------------------------------------------------------------------
//
// Crie os arquivos abaixo na raiz do projeto:
//
//   .env.local        → NEXT_PUBLIC_APP_ENV=development   (uso local, nunca comitar)
//   .env.production   → NEXT_PUBLIC_APP_ENV=production    (usado em next build/start)
//
// No servidor de UAT, defina a variável diretamente na plataforma (Vercel, Railway,
// Docker, etc.) antes de rodar o build:
//   NEXT_PUBLIC_APP_ENV=uat
//
// ---------------------------------------------------------------------------
// Causas comuns para a variável sempre retornar "development"
// ---------------------------------------------------------------------------
//
// 1. Arquivo .env não existe — sem o arquivo a variável é undefined e a função
//    cai no primeiro if (NODE_ENV === "development" em next dev).
//
// 2. Variável definida sem o prefixo NEXT_PUBLIC_ (ex: APP_ENV=uat) — variáveis
//    sem esse prefixo existem apenas no servidor e não são injetadas no bundle
//    do cliente (browser), então process.env.APP_ENV será undefined no frontend.
//
// 3. .env.local sobrescreve tudo — se .env.local define NEXT_PUBLIC_APP_ENV=development,
//    ele tem prioridade sobre .env.production e qualquer outro arquivo .env.
//    Ordem de precedência: .env.local > .env.[environment] > .env
//
// 4. Variável definida depois do build — NEXT_PUBLIC_* é embutida estaticamente
//    em tempo de build (static substitution). Alterar a variável no servidor após
//    o build não tem efeito; é necessário rebuildar com a variável já definida.
//
// 5. NODE_ENV não pode ser "uat" — o Next.js aceita apenas "development",
//    "production" e "test". Tentar setar NODE_ENV=uat é ignorado; o build
//    sempre força NODE_ENV=production. Use NEXT_PUBLIC_APP_ENV para UAT.
