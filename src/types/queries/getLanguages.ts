import { queryField } from 'nexus'

export const getLanguages = queryField('languages', {
  type: 'Language',
  resolve: async (parent, args, { prisma }) => {
    return await prisma.language.findMany()
  },
})
