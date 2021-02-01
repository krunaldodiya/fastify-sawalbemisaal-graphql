import { extendType } from 'nexus'

export const getLanguages = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('languages', {
      type: 'Language',
      resolve: async (parent, args, { prisma }) => {
        return await prisma.language.findMany()
      },
    })
  },
})
