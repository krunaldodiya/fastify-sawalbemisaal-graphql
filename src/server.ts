import Fastify, { FastifyInstance } from 'fastify'
import fastifyJWT from 'fastify-jwt'
import { IncomingMessage, Server, ServerResponse } from 'http'
import mercurius from 'mercurius'
import { createContext } from './context'
import { schemaWithMiddleware } from './schema'

export const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({})

server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || 'secret',
})

server.register(mercurius, {
  schema: schemaWithMiddleware,
  context: createContext,
  path: '/',
  graphiql: 'playground',
  subscription: true,
})

const start = async () => {
  try {
    await server.listen(process.env.PORT || 3000)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log(`server running at http://localhost:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
