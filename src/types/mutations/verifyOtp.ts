import axios from 'axios'
import { idArg, mutationField, nonNull, stringArg } from 'nexus'
import { URLSearchParams } from 'url'
import { userService } from '../../services/UserService'

export const verifyOtp = mutationField('verifyOtp', {
  type: 'AuthPayload',
  args: {
    country_id: nonNull(idArg()),
    mobile: nonNull(stringArg()),
    otp: nonNull(stringArg()),
  },
  resolve: async (parent, { country_id, mobile, otp }, { reply, prisma }) => {
    try {
      const country = await prisma.country.findFirst({
        where: { id: country_id },
      })

      const params = new URLSearchParams({
        authkey: process.env.MSG91_KEY,
        mobile: `${country?.phonecode}${mobile}`,
        otp,
      }).toString()

      const url = `https://api.msg91.com/api/v5/otp/verify?${params}`
      const response = await axios.get(url)

      if (response.data.type === 'success') {
        return userService.createUser({ country_id, mobile })
      }

      return reply.code(500).send({ message: response.data.message })
    } catch (error) {
      const data = error.toJSON()

      return reply.code(500).send({ message: data.message })
    }
  },
})
