import { gql } from 'apollo-server-express'

// não pode criar query vazia
export default gql`
  extend type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
