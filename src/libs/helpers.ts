import { FastifyRequest } from 'fastify'

export const getUser = async ({ jwtVerify }: FastifyRequest) => {
  try {
    const token = await jwtVerify()

    return token
  } catch (error) {
    return null
  }
}
