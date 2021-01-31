import { extendType } from 'nexus'

export const getCountries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('countries', {
      type: 'Country',
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.country.findMany()
      },
    })
  },
})
