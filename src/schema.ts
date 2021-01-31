import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { permissions } from './permissions'
import { Country } from './types/models/Country'
import { Language } from './types/models/Language'
import { Mutation } from './types/Mutation'
import { getCountries } from './types/queries/getCountries'
import { getLanguages } from './types/queries/getLanguages'
import { me } from './types/queries/me'
import { Subscription } from './types/Subscription'

export const schema = makeSchema({
  types: [
    Mutation,
    Subscription,
    Country,
    Language,
    me,
    getLanguages,
    getCountries,
  ],
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
})

export const schemaWithMiddleware = applyMiddleware(schema, permissions)
