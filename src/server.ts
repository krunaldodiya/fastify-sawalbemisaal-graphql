import { makeExecutableSchema } from '@graphql-tools/schema'
import Fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import mercurius from 'mercurius'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({})

server.register(mercurius, {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
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
