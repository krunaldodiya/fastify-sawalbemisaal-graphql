import Queue from 'bull'
import { prisma } from '../context'
import { server } from '../server'

export const walletQueue = new Queue('Wallet Transaction', {
  redis: { port: 6379, host: '127.0.0.1', password: '' },
})

walletQueue.process(async (job, done) => {
  const { amount, user_id, transaction_type, meta } = job.data

  await prisma.wallet.create({
    data: {
      user_id: user_id,
      balance: amount,
    },
  })

  done()
})
