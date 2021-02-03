import { objectType } from 'nexus'
import { TransactionStatus } from '../enums/TransactionStatus'
import { TransactionType } from '../enums/TransactionType'
import { TransactionMeta } from './TransactionMeta'

export const WalletTransaction = objectType({
  name: 'WalletTransaction',
  definition(t) {
    t.model.id()
    t.model.amount()

    t.field('status', { type: TransactionStatus })
    t.field('type', { type: TransactionType })
    t.field('meta', { type: TransactionMeta })

    t.model.user_id()
    t.model.user()
    t.model.wallet_id()
    t.model.wallet()
    t.model.created_at()
    t.model.updated_at()
  },
})
