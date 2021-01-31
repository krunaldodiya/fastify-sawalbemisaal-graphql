import { PrismaClient } from '@prisma/client'
import { getUser, prisma } from './libs/helpers'

export const createContext = async (ctx) => {
  const user = await getUser(ctx)

  return { ...ctx, user, prisma }
}
