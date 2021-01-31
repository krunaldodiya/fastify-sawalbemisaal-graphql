import { extendType } from 'nexus'

export const Language = extendType({
  type: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.nickname()
    t.model.created_at()
    t.model.updated_at()
  },
})
