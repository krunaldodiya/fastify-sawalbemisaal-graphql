import { queryField } from 'nexus'

export const getLanguages = queryField((t) =>
  t.list.field('languages', {
    type: 'Language',
    resolve: async (parent, args, { prisma }) => {
      return await prisma.language.findMany()
    },
  }),
)
