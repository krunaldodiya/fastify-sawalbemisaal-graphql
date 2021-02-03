import { objectType } from 'nexus'

export const Wallet = objectType({
  name: 'Wallet',
  definition(t) {
    t.model.id()
    t.model.balance()
    t.model.user_id()
    t.model.user()
    t.model.wallet_transactions()
    t.model.created_at()
    t.model.updated_at()
  },
})
