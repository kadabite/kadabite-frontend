import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/app/api/graphql/schema';
import { connectToDatabase } from '@/lib/mongoose';

const apolloServer = new ApolloServer({
  schema,
  context: async (req: any, res: any) => {
    // Connect to the database
    await connectToDatabase();

    return { req, res };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export async function POST(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export async function GET(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
