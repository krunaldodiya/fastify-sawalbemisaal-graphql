import axios from 'axios'
import { URLSearchParams } from 'url'
import { prisma } from './libs/helpers'
import { videoQueue } from './queues/video'
import { server } from './server'

export const resolvers = {
  Query: {
    languages: async () => {
      return await prisma.language.findMany()
    },

    countries: async () => {
      return await prisma.country.findMany()
    },

    me: async () => {
      return 'krunal'
    },
  },

  Mutation: {
    requestOtp: async (_, { mobile }, { reply }) => {
      try {
        const otp = (
          Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        ).toString()

        const params = new URLSearchParams({
          authkey: process.env.MSG91_KEY,
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile,
          otp,
          extra_param: JSON.stringify({
            OTP: otp,
            COMPANY_NAME: 'SawalBemisaal',
          }),
        }).toString()

        const url = `https://api.msg91.com/api/v5/otp?${params}`
        const response = await axios.get(url)

        if (response.data.type === 'success') {
          return otp
        }

        reply.code(500).send({ message: response.data.message })
      } catch (error) {
        const data = error.toJSON()

        reply.code(500).send({ message: data.message })
      }
    },

    verifyOtp: async (_, { mobile, otp }, { reply }) => {
      try {
        const params = new URLSearchParams({
          authkey: process.env.MSG91_KEY,
          mobile,
          otp,
        }).toString()

        const url = `https://api.msg91.com/api/v5/otp/verify?${params}`
        const response = await axios.get(url)

        if (response.data.type === 'success') {
          const token = server.jwt.sign({ name: 'krunal' })

          return token
        }

        reply.code(500).send({ message: response.data.message })
      } catch (error) {
        const data = error.toJSON()

        reply.code(500).send({ message: data.message })
      }
    },

    addQueue: async (_, { language_id }, { pubsub }) => {
      const language = await prisma.language.findFirst({
        where: {
          id: language_id,
        },
      })

      videoQueue.add({ language }, { delay: 2000 })

      return language
    },
  },

  Subscription: {
    onQueueAdded: {
      subscribe: async (root, args, { pubsub }) => {
        const payload = await pubsub.subscribe('QUEUE_ADDED')

        return payload
      },
    },
  },
}
