import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import multer from 'fastify-multer'
import path from 'path'

const upload = multer({ dest: path.resolve(__dirname, './uploads') })

export const routes = (
  server: FastifyInstance,
  options: any,
  done: () => void,
) => {
  server.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('hello.pug', { name: 'krunal' })
  })

  server.route({
    method: 'POST',
    url: '/upload',
    preHandler: upload.single('avatar'),
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('done')
    },
  })

  done()
}
