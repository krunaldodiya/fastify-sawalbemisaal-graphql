import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { permissions } from './permissions'
import * as types from './types'

export const schema = makeSchema({
  types,
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
