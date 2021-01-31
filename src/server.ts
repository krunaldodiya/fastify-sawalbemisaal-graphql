import { makeExecutableSchema } from '@graphql-tools/schema'
import Fastify, { FastifyInstance } from 'fastify'
import fastifyJWT from 'fastify-jwt'
import { applyMiddleware } from 'graphql-middleware'
import { IncomingMessage, Server, ServerResponse } from 'http'
import mercurius from 'mercurius'
import { permissions } from './permissions'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

export const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({})

const getUser = async (req) => {
  try {
    const token = await req.jwtVerify()

    return token
  } catch (error) {
    return null
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(schema, permissions)

server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || 'secret',
})

server.register(mercurius, {
  schema: schemaWithMiddleware,
  context: async (req) => {
    const user = await getUser(req)
    return { ...req, user }
  },
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
