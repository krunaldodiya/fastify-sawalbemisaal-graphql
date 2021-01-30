import { prisma } from './libs/helpers'
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
      // videoQueue.add({ pubsub, language_id }, { delay: 2000 })

      const language = await prisma.language.findFirst({
        where: {
          id: language_id,
        },
      })

      pubsub.publish({
        topic: 'QUEUE_ADDED',
        payload: {
          onQueueAdded: language,
        },
      })

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
