import { enumType } from 'nexus'

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['Deposit', 'Withdraw'],
})
