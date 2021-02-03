import { TransactionStatus, TransactionType } from '@prisma/client'
import { Country } from './models/Country'
import { Language } from './models/Language'
import { TransactionMeta } from './models/TransactionMeta'
import { User } from './models/User'
import { Wallet } from './models/Wallet'
import { WalletTransaction } from './models/WalletTransaction'
import { addQueue } from './mutations/addQueue'
import { requestOtp } from './mutations/requestOtp'
import { verifyOtp } from './mutations/verifyOtp'
import { AuthPayload } from './payloads/AuthPayload'
import { getCountries } from './queries/getCountries'
import { getLanguages } from './queries/getLanguages'
import { me } from './queries/me'
import { onQueueAdded } from './Subscription'

export default [
  AuthPayload,
  TransactionType,
  TransactionStatus,
  TransactionMeta,
  User,
  Country,
  Language,
  Wallet,
  WalletTransaction,
  me,
  getLanguages,
  getCountries,
  addQueue,
  requestOtp,
  verifyOtp,
  onQueueAdded,
]
