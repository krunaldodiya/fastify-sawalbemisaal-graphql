import { FastifyInstance } from 'fastify'

export async function monitorGraph(
  fastify: FastifyInstance,
  { enabled }: { enabled: boolean },
) {
  if (enabled === false) {
    return false
  }

  fastify.addHook('onRequest', (request, reply, done) => {
    done()
  })
}
