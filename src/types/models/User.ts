import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.country_id()
    t.field('country', { type: 'Country' })
    t.model.mobile()
    t.model.name()
    t.model.username()
    t.model.email()
    t.model.password()
    t.model.created_at()
    t.model.updated_at()
  },
})
