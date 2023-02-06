import { createYoga, createSchema } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = createSchema({
  typeDefs: `
    type Query {
      users: [User!]!
    }
    type User {
      name: String
    }
  `,
  resolvers: {
    Query: {
      users(parent: any, argsL: any, context: any) {
        return [{ name: 'Nextjs' }];
      },
    },
  },
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
});
