import Queue from 'bull'
import { prisma } from '../context'
import { userService } from '../services/UserService'

export const followAdmin = new Queue('Follow Admin', {
  redis: { port: 6379, host: '127.0.0.1', password: '' },
})

followAdmin.process(async (job, done) => {
  const { user_id } = job.data

  try {
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@sawalbemisaal.com' },
      rejectOnNotFound: true,
    })

    userService.followUser({ user_id, guest_id: admin.id })
  } catch (error) {
    console.log('error', error)
  }

  done()
})
