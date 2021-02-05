import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getUser } from './libs/helpers'

export const prisma = new PrismaClient()

export interface Context {
  user: any
  request: FastifyRequest
  reply: FastifyReply
  prisma: PrismaClient
}

export const createContext = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Context> => {
  const user = await getUser(request)

  return {
    user,
    request,
    reply,
    prisma,
  }
}
