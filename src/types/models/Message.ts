import { objectType } from 'nexus'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id()
    t.model.sender_id()
    t.model.receiver_id()
    t.model.message()
    t.model.created_at()
    t.model.updated_at()
  },
})
