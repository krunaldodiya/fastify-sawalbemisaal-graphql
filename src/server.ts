import { makeExecutableSchema } from '@graphql-tools/schema'
import Fastify, { FastifyInstance } from 'fastify'
import fastifyJWT from 'fastify-jwt'
import { applyMiddleware } from 'graphql-middleware'
import { rule, shield } from 'graphql-shield'
import { IncomingMessage, Server, ServerResponse } from 'http'
import mercurius from 'mercurius'
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

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null
  },
)

const permissions = shield({
  Query: {
    languages: isAuthenticated,
  },
  Mutation: {
    addQueue: isAuthenticated,
  },
})

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(schema, permissions)

server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET,
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

// server.addHook('onRequest', (request) => request.jwtVerify())

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
