import { nonNull, queryField, stringArg } from 'nexus'

export const getMessages = queryField((t) => {
  t.list.field('messages', {
    type: 'Message',
    args: { buddy_id: nonNull(stringArg()) },
    resolve: async (parent, { buddy_id }, { prisma, user }) => {
      return await prisma.message.findMany({
        where: {
          OR: [
            { sender_id: user.id, receiver_id: buddy_id },
            { sender_id: buddy_id, receiver_id: user.id },
          ],
        },
      })
    },
  })
})
