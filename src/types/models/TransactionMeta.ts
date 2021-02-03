import { objectType } from 'nexus'

export const TransactionMeta = objectType({
  name: 'TransactionMeta',
  definition(t) {
    t.string('title')
    t.string('description')
  },
})
