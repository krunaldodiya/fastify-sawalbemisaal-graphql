import { TransactionStatus, TransactionType } from '@prisma/client'
import { Country } from './models/Country'
import { Language } from './models/Language'
import { Message } from './models/Message'
import { TransactionMeta } from './models/TransactionMeta'
import { User } from './models/User'
import { Wallet } from './models/Wallet'
import { WalletTransaction } from './models/WalletTransaction'
import { addMessage } from './mutations/addMessage'
import { addQueue } from './mutations/addQueue'
import { editProfile } from './mutations/editProfile'
import { followUser } from './mutations/followUser'
import { requestOtp } from './mutations/requestOtp'
import { verifyOtp } from './mutations/verifyOtp'
import { AuthPayload } from './payloads/AuthPayload'
import { FollowStatus } from './payloads/FollowStatus'
import { checkFollowStatus } from './queries/checkFollowStatus'
import { findUserById } from './queries/findUserById'
import { countries } from './queries/countries'
import { languages } from './queries/languages'
import { messages } from './queries/messages'
import { me } from './queries/me'
import { onMessageAdded } from './subscriptions/onMessageAdded'
import { onQueueAdded } from './subscriptions/onQueueAdded'

export default [
  AuthPayload,
  TransactionType,
  TransactionStatus,
  TransactionMeta,
  Message,
  User,
  Country,
  Language,
  Wallet,
  WalletTransaction,
  me,
  findUserById,
  languages,
  countries,
  addQueue,
  requestOtp,
  verifyOtp,
  onQueueAdded,
  onMessageAdded,
  followUser,
  checkFollowStatus,
  FollowStatus,
  editProfile,
  addMessage,
  messages,
]
