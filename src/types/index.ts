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
import { getCountries } from './queries/getCountries'
import { getLanguages } from './queries/getLanguages'
import { getMessages } from './queries/getMessages'
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
  getLanguages,
  getCountries,
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
  getMessages,
]
