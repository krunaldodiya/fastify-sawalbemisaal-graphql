import { nonNull, queryField, stringArg } from 'nexus'

export const findUserById = queryField('findUserById', {
  type: 'User',
  args: { user_id: nonNull(stringArg()) },
  resolve: async (parent, { user_id }, { prisma, user, reply }) => {
    try {
      return await prisma.user.findFirst({ where: { id: user_id } })
    } catch (error) {
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
