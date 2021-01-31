import axios from 'axios'
import { extendType, stringArg } from 'nexus'
import { URLSearchParams } from 'url'
import { server } from '../../server'

export const verifyOtp = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('verifyOtp', {
      type: 'String',
      args: { mobile: stringArg(), otp: stringArg() },
      resolve: async (parent, { mobile, otp }, { reply }) => {
        try {
          const params = new URLSearchParams({
            authkey: process.env.MSG91_KEY,
            mobile: mobile ?? '',
            otp: otp ?? '',
          }).toString()

          const url = `https://api.msg91.com/api/v5/otp/verify?${params}`
          const response = await axios.get(url)

          if (response.data.type === 'success') {
            const token = server.jwt.sign({ name: 'krunal' })

            return token
          }

          return reply.code(500).send({ message: response.data.message })
        } catch (error) {
          const data = error.toJSON()

          return reply.code(500).send({ message: data.message })
        }
      },
    })
  },
})
