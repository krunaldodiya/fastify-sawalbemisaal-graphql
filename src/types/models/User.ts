import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.country_id()
    t.field('country', {
      type: 'Country',
      resolve: async (root, args, { prisma }) => {
        return await prisma.user.findFirst({ where: { id: root.id } }).country()
      },
    })
    t.model.country_id()
    t.field('wallet', {
      type: 'Wallet',
      resolve: async (root, args, { prisma }) => {
        return await prisma.user.findFirst({ where: { id: root.id } }).wallet()
      },
    })
    t.model.mobile()
    t.model.name()
    t.model.username()
    t.model.email()
    t.model.dob()
    t.model.gender()
    t.model.avatar()
    t.model.instagram_username()
    t.model.bio()
    t.model.admin()
    t.model.influencer()
    t.model.demo()
    t.model.status()

    t.model.fcm_token()
    t.model.version()
    t.model.referral_code()

    t.model.created_at()
    t.model.updated_at()
  },
})
