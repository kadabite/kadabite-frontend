import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import typeDefs from '@/app/api/graphql/schema';
import resolvers from '@/app/api/graphql/resolvers';
import dotenv from 'dotenv';
import { initialize } from '@/lib/initialize';

dotenv.config();

async function startServer() {
  await initialize(); // Ensure initialization is complete

  const apolloServer = new ApolloServer<{}>({
    typeDefs,
    resolvers,
  });

  const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
    context: async (req, res) => ({
      req,
      res,
    }),
  });

  return handler;
}

const handlerPromise = startServer();

export async function POST(request: NextRequest) {
  const handler = await handlerPromise;
  return handler(request);
}

export async function GET(request: NextRequest) {
  const handler = await handlerPromise;
  return handler(request);
}
