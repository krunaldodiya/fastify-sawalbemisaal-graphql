import { arg, intArg, nonNull, queryField, stringArg } from 'nexus'

export const messages = queryField((t) => {
  t.list.field('messages', {
    type: 'Message',
    args: {
      buddy_id: nonNull(stringArg()),
      cursor: arg({ type: 'Cursor' }),
      limit: nonNull(intArg()),
    },
    resolve: async (parent, { buddy_id, cursor, limit }, { prisma, user }) => {
      try {
        return await prisma.message.findMany({
          cursor,
          take: limit,
          where: {
            OR: [
              { sender_id: user.id, receiver_id: buddy_id },
              { sender_id: buddy_id, receiver_id: user.id },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new Error('something went wrong')
      }
    },
  })
})
