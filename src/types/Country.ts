import { objectType } from 'nexus'

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.shortname()
    t.model.phonecode()
    t.model.created_at()
    t.model.updated_at()
  },
})
