import { enumType } from 'nexus'

export const TransactionStatus = enumType({
  name: 'TransactionStatus',
  members: ['Success', 'Failed', 'Pending'],
})
