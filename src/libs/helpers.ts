import { FastifyRequest } from 'fastify'

export const getUser = async (ctx: FastifyRequest) => {
  try {
    const token = await ctx.jwtVerify()

    return token
  } catch (error) {
    return null
  }
}
