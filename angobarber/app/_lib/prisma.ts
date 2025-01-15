import { PrismaClient } from "@prisma/client"

/*Este codigo garante que apenas uma instacia do prisma client vai ser instanciada no seu servidor do next*/
//* Arquivo que cria a conexao com o nosso banco de dados

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var cachedPrisma: PrismaClient
}

export let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
