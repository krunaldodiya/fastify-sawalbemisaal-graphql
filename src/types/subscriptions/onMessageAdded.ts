import { subscriptionField } from 'nexus'

export const onMessageAdded = subscriptionField('onMessageAdded', {
  type: 'Message',
  subscribe: (parent, args, { pubsub }) => {
    return pubsub.subscribe('MESSAGE_ADDED')
  },
  resolve: (payload: any) => {
    return payload
  },
})
