import axios from 'axios'
import { mutationField, stringArg } from 'nexus'
import { URLSearchParams } from 'url'

const otp = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString()

export const requestOtp = mutationField('requestOtp', {
  type: 'String',
  args: { mobile: stringArg() },
  resolve: async (parent, { mobile }, { reply }) => {
    try {
      const params = new URLSearchParams({
        authkey: process.env.MSG91_KEY,
        template_id: process.env.MSG91_TEMPLATE_ID,
        mobile: mobile ?? '',
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

      return reply.code(500).send({ message: response.data.message })
    } catch (error) {
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
