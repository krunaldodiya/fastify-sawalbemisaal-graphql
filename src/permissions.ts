import { rule, shield } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    return user === null || user === undefined ? false : true
  },
)

export const permissions = shield({
  Query: {
    me: isAuthenticated,
    checkFollowStatus: isAuthenticated,
    findUserById: isAuthenticated,
    messages: isAuthenticated,
  },
  Mutation: {
    addQueue: isAuthenticated,
    addMessage: isAuthenticated,
    followUser: isAuthenticated,
    editProfile: isAuthenticated,
  },
  Subscription: {
    onQueueAdded: isAuthenticated,
    onMessageAdded: isAuthenticated,
  },
})
