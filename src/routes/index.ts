import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export const routes = (
  server: FastifyInstance,
  options: any,
  done: () => void,
) => {
  server.get('/test', (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('hello.pug', { name: 'krunal' })
  })

  done()
}
