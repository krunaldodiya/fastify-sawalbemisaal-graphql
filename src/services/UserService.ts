import { User } from '@prisma/client'
import { prisma } from '../context'
import { generatePin } from '../libs/generatePin'
import { followAdmin } from '../queues/followAdmin'
import { server } from '../server'

export class UserService {
  async createUser({
    mobile,
    country_id,
  }: {
    mobile: string
    country_id: string
  }) {
    const user = await prisma.user.findFirst({ where: { mobile } })

    if (user) {
      return this.authenticate(user)
    }

    const newUser = await prisma.user.create({
      data: {
        mobile,
        country_id,
        referral_code: generatePin(),
      },
    })

    await prisma.wallet.create({
      data: {
        balance: 10,
        user_id: newUser.id,
        wallet_transactions: {
          create: {
            user_id: newUser.id,
            amount: 10,
            type: 'Deposit',
            status: 'Success',
            meta: { title: 'joining_bonus', description: 'welcome to our app' },
          },
        },
      },
    })

    followAdmin.add({ user_id: newUser.id })

    return this.authenticate(newUser)
  }

  async findUserById(user_id: string) {
    return await prisma.user.findFirst({
      where: { id: user_id },
      rejectOnNotFound: true,
    })
  }

  async authenticate(user: User) {
    const token = server.jwt.sign({ id: user.id })
    return { token, user }
  }

  async checkFollowStatus(guest_id: string, user_id: string) {
    const guest = await prisma.user.findFirst({
      rejectOnNotFound: true,
      where: {
        id: guest_id,
      },
      include: {
        followers: {
          where: { id: user_id },
        },
        following: {
          where: { id: user_id },
        },
      },
    })

    return {
      is_follower: guest.following.length ? true : false,
      is_following: guest.followers.length ? true : false,
    }
  }

  async followUser({
    user_id,
    following_id,
  }: {
    user_id: string
    following_id: string
  }) {
    return await prisma.user.update({
      where: { id: user_id },
      data: { following: { connect: { id: following_id } } },
    })
  }
}

export const userService = new UserService()
