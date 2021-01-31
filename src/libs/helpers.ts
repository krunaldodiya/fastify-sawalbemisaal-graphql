import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const getUser = async (ctx) => {
  try {
    const token = await ctx.jwtVerify()

    return token
  } catch (error) {
    return null
  }
}
