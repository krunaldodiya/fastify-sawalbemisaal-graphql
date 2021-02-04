import { mutationField, stringArg } from 'nexus'

export const editProfile = mutationField('editProfile', {
  type: 'User',
  args: { name: stringArg(), email: stringArg() },
  resolve: async (parent, { name, email }, { prisma, user, reply }) => {
    try {
      return await prisma.user.update({
        where: { id: user.id },
        data: { name, email, status: true },
      })
    } catch (error) {
      console.log(error, 'error')
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
