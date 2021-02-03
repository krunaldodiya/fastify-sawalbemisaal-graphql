import { objectType } from 'nexus'

export const Wallet = objectType({
  name: 'Wallet',
  definition(t) {
    t.model.id()
    t.model.balance()
    t.model.user_id()
    t.field('user', {
      type: 'User',
      resolve: async (root, args, { prisma }) => {
        return await prisma.user.findFirst({
          where: { id: root.user_id },
        })
      },
    })
    t.list.field('wallet_transactions', {
      type: 'WalletTransaction',
      resolve: async (root, args, { prisma }) => {
        return await prisma.walletTransaction.findMany({
          where: { wallet_id: root.id },
        })
      },
    })
    t.model.created_at()
    t.model.updated_at()
  },
})
