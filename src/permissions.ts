import { rule, shield } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    return user === null || user === undefined ? false : true
  },
)

export const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    addQueue: isAuthenticated,
    followUser: isAuthenticated,
  },
})
