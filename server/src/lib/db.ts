import { PrismaClient } from "@prisma/client/extension"

// import  from '@prisma/client'

type ClientMap = Map<string, PrismaClient>

// Prisma pool/manager: returns same PrismaClient instance for same clientId.
// Uses a global to avoid multiple instances in dev/hot-reload.
const globalAny: any = globalThis as any

if (!globalAny.__PRISMA_POOL__) {
    globalAny.__PRISMA_POOL__ = new Map()
}

const prismaPool: ClientMap = globalAny.__PRISMA_POOL__

export function getPrisma(clientId = 'default'): PrismaClient {
    if (prismaPool.has(clientId)) return prismaPool.get(clientId) as PrismaClient

    const prisma = new PrismaClient({
        // you can tune logging or datasources here if needed
        log: ['query', 'info', 'warn', 'error'],
    })

    // connect immediately so that the same connection is kept for this clientId
    prisma
        .$connect()
        .catch((e: Error) => {
            // swallow connect errors here; callers can still use the client and handle errors
            console.error('Prisma connect error for clientId=', clientId, e)
        })

    prismaPool.set(clientId, prisma)
    return prisma
}

export async function disconnectPrisma(clientId?: string) {
    if (clientId) {
        const p = prismaPool.get(clientId)
        if (p) {
            await p.$disconnect().catch(() => { })
            prismaPool.delete(clientId)
        }
        return
    }

    // disconnect all
    const entries = Array.from(prismaPool.entries())
    await Promise.all(entries.map(([, p]) => p.$disconnect().catch(() => { })))
    prismaPool.clear()
}

export function listPrismaClients() {
    return Array.from(prismaPool.keys())
}

// default export for convenience
export default getPrisma

// Singleton prisma instance for convenient/shared usage
// Use getPrisma internally to ensure pool/global behavior is respected
export const prisma = getPrisma();
