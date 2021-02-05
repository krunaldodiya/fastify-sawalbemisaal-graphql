import { inputObjectType } from 'nexus'

export const Cursor = inputObjectType({
  name: 'Cursor',
  definition(t) {
    t.nonNull.field('id', { type: 'String' })
  },
})
