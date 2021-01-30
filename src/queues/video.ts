import Queue from 'bull'
import { prisma } from '../libs/helpers'

export const videoQueue = new Queue('Video Transcoding', {
  redis: { port: 6379, host: '127.0.0.1', password: '' },
})

videoQueue.process(async (job) => {
  const { pubsub, language_id } = job.data

  pubsub.publish({
    topic: 'QUEUE_ADDED',
    payload: {
      onQueueAdded: await prisma.language.findFirst({
        where: {
          id: language_id,
        },
      }),
    },
  })
})
