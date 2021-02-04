import { objectType } from 'nexus'

export const FollowStatus = objectType({
  name: 'FollowStatus',
  definition(t) {
    t.boolean('is_following')
    t.boolean('is_follower')
  },
})
