import { gql } from 'apollo-server-express'

// mutation: efeito colateral na query
export default gql`
  extend type Query {
    login (email: String!, password: String!): Account!
  }

  extend type Mutation {
    signUp (name: String!, email: String!, password: String!, passwordConfirmation: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
