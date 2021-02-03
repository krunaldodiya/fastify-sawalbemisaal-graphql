import { User } from '@prisma/client'
import { prisma } from '../context'
import { generatePin } from '../libs/generatePin'
import { server } from '../server'

export class UserService {
  async createUser({
    mobile,
    country_id,
  }: {
    mobile: string
    country_id: string
  }) {
    const user = await prisma.user.findUnique({ where: { mobile } })

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

    return this.authenticate(newUser)
  }

  async authenticate(user: User) {
    const token = server.jwt.sign({ id: user.id })
    return { token, user }
  }
}

export const userService = new UserService()
