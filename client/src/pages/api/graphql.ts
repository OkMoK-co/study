import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};
const userTable = [{ name: "Nextjs" }, { name: "jiyo" }, { name: "hello" }];
const schema = createSchema({
  typeDefs: `
    type Query {
      users: [User!]!
      getUserByName(name:String): User
    }
    type User {
      name: String
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
      getUserByName: (name) => {
        return userTable.filter((e) => e.name == name)[0];
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
