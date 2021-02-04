import { nonNull, queryField, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const findUserById = queryField('findUserById', {
  type: 'User',
  args: { user_id: nonNull(stringArg()) },
  resolve: async (parent, { user_id }, { prisma, user, reply }) => {
    return userService.findUserById(user_id)
  },
})
