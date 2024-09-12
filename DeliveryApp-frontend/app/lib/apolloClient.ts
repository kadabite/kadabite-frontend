// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import dotenv from 'dotenv';
dotenv.config();

// get environment variable
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});

export default client;
