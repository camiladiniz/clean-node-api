import { gql } from 'apollo-server-express'

// mutation: efeito colateral na query
export default gql`
  type Query {
    login (email: String!, password: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
