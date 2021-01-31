import Queue from 'bull'
import { server } from '../server'

export const videoQueue = new Queue('Video Transcoding', {
  redis: { port: 6379, host: '127.0.0.1', password: '' },
})

videoQueue.process(async (job, done) => {
  const { language } = job.data

  server.graphql.pubsub.publish({
    topic: 'QUEUE_ADDED',
    payload: {
      onQueueAdded: language,
    },
  })
})
