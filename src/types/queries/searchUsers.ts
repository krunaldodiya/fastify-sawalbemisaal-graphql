import { nonNull, queryField, stringArg } from 'nexus'

export const searchUsers = queryField((t) => {
  t.list.field('searchUsers', {
    type: 'User',
    args: { keywords: nonNull(stringArg()) },
    resolve: async (parent, { keywords }, { prisma, user }) => {
      return await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: keywords } },
            { username: { contains: keywords } },
          ],
          status: true,
        },
      })
    },
  })
})
