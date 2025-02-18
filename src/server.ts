import Fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import fastifyJWT from 'fastify-jwt'
import multer from 'fastify-multer'
import { IncomingMessage, Server, ServerResponse } from 'http'
import mercurius from 'mercurius'
import pointOfView from 'point-of-view'
import pug from 'pug'
import { createContext } from './context'
import { routes } from './routes'
import { schemaWithMiddleware } from './schema'

export const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({})

server.register(multer.contentParser)

server.register(pointOfView, { engine: { pug }, templates: 'templates' })

server.register(routes)

server.register(fastifyCors)

server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || 'secret',
})

server.register(mercurius, {
  schema: schemaWithMiddleware,
  context: createContext,
  path: '/',
  graphiql: 'playground',
  subscription: {
    onConnect: async ({ type, payload }) => {
      if (type === 'connection_init' && payload['Authorization']) {
        const token = payload['Authorization'].slice(7)

        return {
          user: server.jwt.verify(token),
        }
      }

      return {
        user: null,
      }
    },
  },
})

const start = async () => {
  try {
    await server.listen(process.env.PORT || 3333)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log(`server running at http://localhost:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
