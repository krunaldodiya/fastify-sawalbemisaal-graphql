import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    languages: [Language]
  }

  type Mutation {
    addQueue(language_id: ID!): Language!
    getToken: String!
  }

  type Subscription {
    onQueueAdded: Language
  }

  type Language {
    id: String
    name: String
    nickname: String
  }
`
