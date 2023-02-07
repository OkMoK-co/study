import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    name: String!
    nickName: String
  }
  type Query {
    users: [User]
    getUserByName(name: String): User
  }
  type Mutation {
    addUser(name: String): [User]
    modifyNickname(name: String, nickName: String): User
  }
`;

export default typeDefs;
