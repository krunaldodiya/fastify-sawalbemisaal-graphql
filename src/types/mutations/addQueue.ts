import { extendType, idArg } from 'nexus'
import { videoQueue } from '../../queues/video'

export const addQueue = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('addQueue', {
      type: 'Language',
      args: { language_id: idArg() },
      resolve: async (parent, { language_id }, ctx) => {
        const language = await ctx.prisma.language.findFirst({
          where: {
            id: language_id ?? '',
          },
        })

        videoQueue.add({ language }, { delay: 2000 })

        return language
      },
    })
  },
})
