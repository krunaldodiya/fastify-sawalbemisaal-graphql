import { subscriptionType } from 'nexus'

export const Subscription = subscriptionType({
  definition(t) {
    t.field('onQueueAdded', {
      type: 'Language',
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.subscribe('QUEUE_ADDED')
      },
      resolve: (data) => {
        return { id: 'test', name: 'hello', nickname: 'test' }
      },
    })
  },
})
