import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    name: String!
    nickName: String
    age: Int
  }
  input UserFilter {
    name: String
    age: Int
  }
  type Query {
    users: [User]
    usersFilter(filter: UserFilter): [User]
    getUserByName(name: String): User
  }
  type Mutation {
    addUser(name: String): [User]
    modifyNickname(name: String, nickName: String): User
  }
`;

export default typeDefs;
