import { mutationField, stringArg } from 'nexus'

export const editProfile = mutationField('editProfile', {
  type: 'User',
  args: { name: stringArg() },
  resolve: async (parent, { name }, { prisma, user, reply }) => {
    try {
      return await prisma.user.update({
        where: { id: user.id },
        data: { name, status: true },
      })
    } catch (error) {
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
