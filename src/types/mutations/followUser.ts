import { mutationField, nonNull, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const followUser = mutationField('followUser', {
  type: 'User',
  args: { following_id: nonNull(stringArg()) },
  resolve: async (parent, { following_id }, { prisma, user, reply }) => {
    try {
      return userService.followUser({
        user_id: user.id,
        guest_id: following_id,
      })
    } catch (error) {
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
