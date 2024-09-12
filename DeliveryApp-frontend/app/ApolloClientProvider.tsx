"use client";  // Mark this as a client component

import { ApolloProvider } from '@apollo/client';
import client from '@/app/lib/apolloClient';
import { ReactNode } from 'react';

export default function ApolloClientProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
