import { extendType } from 'nexus'

export const me = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: 'String',
      resolve: (parent, args, ctx) => {
        return 'krunal'
      },
    })
  },
})
