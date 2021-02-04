import { subscriptionField } from 'nexus'

export const onQueueAdded = subscriptionField('onQueueAdded', {
  type: 'Language',
  subscribe: (parent, args, { pubsub }) => {
    return pubsub.subscribe('QUEUE_ADDED')
  },
  resolve: (payload: any) => {
    return payload
  },
})
