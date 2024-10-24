import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // Get the session data
  const session = await getSession();

  // Return the headers with the authorization token if it exists
  return {
    headers: {
      ...headers, // Ensure existing headers are not lost
      authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '', // Add the token if available
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;