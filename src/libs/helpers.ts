import { FastifyRequest } from 'fastify'

export const getUser = async (request: FastifyRequest) => {
  try {
    return await request.jwtVerify()
  } catch (error) {
    return undefined
  }
}
