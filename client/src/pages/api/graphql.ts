import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface usertype {
  name: String;
}
const userTable: usertype[] = [
  { name: "Nextjs" },
  { name: "jiyo" },
  { name: "hello" },
];
const schema = createSchema({
  typeDefs: `
    type Query {
      users: [User!]!
      getUserByName(name:String): User
    }
    type User {
      name: String
    }
    type Mutation {
      addUser(name:String): [User]
    }
  `,
  resolvers: {
    Query: {
      // users(parent: any, argsL: any, context: any) {
      //   return [{ name: "Nextjs" }]; //??
      // },
      users: () => {
        return userTable;
      },
      getUserByName: (name: String) => {
        //왜 안될까?
        console.log(name);
        return userTable.filter((e) => e.name === name)[0];
      },
    },
    Mutation: {
      addUser: (name: String) => {
        userTable.push({ name: name });
        return userTable;
      },
    },
  },
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
});
