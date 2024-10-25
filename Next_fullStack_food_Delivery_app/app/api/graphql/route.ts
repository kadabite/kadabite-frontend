import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import typeDefs from '@/app/api/graphql/schema';
import resolvers from '@/app/api/graphql/resolvers';
import dotenv from 'dotenv';
import { initialize } from '@/lib/initialize';
import { auth } from '@/auth';

dotenv.config();

let handlerPromise: Promise<(req: NextRequest) => Promise<Response>> | null = null;

async function startServer() {
  // Ensure initialization is complete before starting the server
  await initialize();

  const apolloServer = new ApolloServer<{}>({
    typeDefs,
    resolvers,
  });

  const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
    context: async (req, res) => {
      const session = await auth();
      if (!session) {
        return { req, res, user: { id: '', role: 'guest' } };
      }
      const role = session?.user.role;
      const id = session?.user.id;
      return { req, res, role, user: { id, role } }
    },
  });
  return handler;
}

export async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = startServer();
  }
  return handlerPromise;
}

export async function POST(request: NextRequest) {
  const handler = await getHandler();
  return handler(request);
}

export async function GET(request: NextRequest) {
  const handler = await getHandler();
  return handler(request);
}
