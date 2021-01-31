import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { permissions } from './permissions'
import { Country } from './types/Country'
import { Language } from './types/Language'
import { Mutation } from './types/Mutation'
import { Query } from './types/Query'
import { Subscription } from './types/Subscription'

export const schema = applyMiddleware(
  makeSchema({
    types: [Query, Mutation, Subscription, Country, Language],
    plugins: [nexusPrisma()],
    outputs: {
      schema: `${__dirname}/generated/schema.graphql`,
      typegen: `${__dirname}/generated/nexus.d.ts`,
    },
    contextType: {
      module: require.resolve('./context'),
      alias: 'Context',
      export: 'Context',
    },
    sourceTypes: {
      modules: [
        {
          module: '@prisma/client',
          alias: 'client',
        },
      ],
    },
  }),
  permissions,
)
