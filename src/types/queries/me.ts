import { queryField } from 'nexus'

export const me = queryField('me', {
  type: 'User',
  resolve: (parent, args, { prisma, user }) => {
    return prisma.user.findFirst({ where: { id: user.id } })
  },
})
