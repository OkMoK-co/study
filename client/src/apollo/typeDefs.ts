import { gql } from '@apollo/client';

const typeDefs = gql`
  type User {
    name: String
    nickName: String
  }
  type Query {
    users: [User]
  }
`;

export default typeDefs;
