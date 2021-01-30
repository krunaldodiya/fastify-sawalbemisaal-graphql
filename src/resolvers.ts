import { prisma } from './libs/helpers'
import { videoQueue } from './queues/video'
import { server } from './server'

export const resolvers = {
  Query: {
    languages: async () => {
      return await prisma.language.findMany()
    },
  },

  Mutation: {
    getToken: async (_, args, context) => {
      const token = server.jwt.sign({})

      return token
    },

    addQueue: async (_, { language_id }, { pubsub }) => {
      const language = await prisma.language.findFirst({
        where: {
          id: language_id,
        },
      })

      videoQueue.add({ language }, { delay: 2000 })

      return language
    },
  },

  Subscription: {
    onQueueAdded: {
      subscribe: async (root, args, { pubsub }) => {
        const payload = await pubsub.subscribe('QUEUE_ADDED')

        return payload
      },
    },
  },
}
