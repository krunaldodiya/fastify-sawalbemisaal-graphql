import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    languages: [Language]
    countries: [Country]
    me: String
  }

  type Mutation {
    addQueue(language_id: ID!): Language!
    requestOtp(mobile: String!): String!
    verifyOtp(mobile: String!, otp: String!): String!
  }

  type Subscription {
    onQueueAdded: Language
  }

  type Language {
    id: String
    name: String
    nickname: String
  }

  type Country {
    id: String
    name: String
    shortname: String
    phonecode: String
  }
`
