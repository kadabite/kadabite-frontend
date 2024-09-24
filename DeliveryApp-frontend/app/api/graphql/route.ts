import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import typeDefs from '@/app/api/graphql/schema';
import resolvers from '@/app/api/graphql/resolvers';
import mongoose from 'mongoose';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
  }),
});

// const startServer = apolloServer.start();

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function GET(request: NextRequest) {
  return handler(request);
}
