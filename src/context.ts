import { PrismaClient } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { getUser } from './libs/helpers'

export const prisma = new PrismaClient()

export interface DataMeta {
  user: any
  prisma: PrismaClient
}

export const createContext = async (ctx: FastifyRequest) => {
  const user = await getUser(ctx)

  return {
    ...ctx,
    user,
    prisma,
  }
}
