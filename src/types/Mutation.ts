import axios from 'axios'
import { idArg, mutationType, stringArg } from 'nexus'
import { URLSearchParams } from 'url'
import { videoQueue } from '../queues/video'
import { server } from '../server'

export const Mutation = mutationType({
  definition(t) {
    t.nullable.field('addQueue', {
      type: 'Language',
      args: { language_id: idArg() },
      resolve: async (parent, { language_id }, ctx) => {
        const language = await ctx.prisma.language.findFirst({
          where: {
            id: language_id,
          },
        })

        videoQueue.add({ language }, { delay: 2000 })

        return language
      },
    })

    t.nullable.field('requestOtp', {
      type: 'String',
      args: { mobile: stringArg() },
      resolve: async (parent, { mobile }, { reply }) => {
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
    })

    t.nullable.field('verifyOtp', {
      type: 'String',
      args: { mobile: stringArg(), otp: stringArg() },
      resolve: async (parent, { mobile, otp }, { reply }) => {
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
    })
  },
})
