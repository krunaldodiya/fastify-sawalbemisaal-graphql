import { idArg, mutationField, nonNull } from 'nexus'
import { videoQueue } from '../../queues/video'

export const addQueue = mutationField('addQueue', {
  type: 'Language',
  args: { language_id: nonNull(idArg()) },
  resolve: async (parent, { language_id }, { prisma }) => {
    const language = await prisma.language.findFirst({
      where: {
        id: language_id,
      },
    })

    videoQueue.add({ language }, { delay: 1000 })

    return language
  },
})
