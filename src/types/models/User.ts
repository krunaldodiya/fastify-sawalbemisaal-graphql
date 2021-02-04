import { objectType } from 'nexus'
import { userService } from '../../services/UserService'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.country_id()
    t.model.country()
    t.model.wallet()
    t.model.following()
    t.model.followers()
    t.model.mobile()
    t.model.name()
    t.model.username()
    t.model.email()
    t.model.dob()
    t.model.gender()
    t.model.avatar()
    t.model.instagram_username()
    t.model.bio()
    t.model.admin()
    t.model.influencer()
    t.model.demo()
    t.model.status()
    t.model.fcm_token()
    t.model.version()
    t.model.referral_code()

    t.field('follow_status', {
      type: 'FollowStatus',
      resolve: async (root, args, { prisma, user }) => {
        return userService.checkFollowStatus(root.id, user.id)
      },
    })

    t.model.created_at()
    t.model.updated_at()
  },
})
