import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'String',
      resolve: (parent, args, ctx) => {
        return 'krunal'
      },
    })

    t.list.field('languages', {
      type: 'Language',
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.language.findMany()
      },
    })

    t.list.field('countries', {
      type: 'Country',
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.country.findMany()
      },
    })
  },
})
