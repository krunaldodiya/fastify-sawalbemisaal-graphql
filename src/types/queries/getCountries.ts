import { queryField } from 'nexus'

export const getCountries = queryField('countries', {
  type: 'Country',
  resolve: async (parent, args, { prisma }) => {
    return await prisma.country.findMany()
  },
})
