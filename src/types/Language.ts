import { objectType } from 'nexus'

export const Language = objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.nickname()
    t.model.created_at()
    t.model.updated_at()
  },
})
