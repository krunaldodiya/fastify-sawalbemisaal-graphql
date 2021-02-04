import { queryField } from 'nexus'

export const getCountries = queryField((t) => {
  t.list.field('countries', {
    type: 'Country',
    resolve: async (parent, args, { prisma }) => {
      return await prisma.country.findMany()
    },
  })
})
