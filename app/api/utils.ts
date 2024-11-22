import { myLogger } from '@/app/api/upload/logger';
import fetch, { Response } from 'node-fetch';

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Graphql request
export async function myRequest(query: any, variables: Record<string, any>): Promise<any> {
  const token = variables?.token;
  const response = await fetch(`${process.env.DELIVER_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token && `Bearer ${variables.token}`,
    },
    body: JSON.stringify({
      query: query.loc?.source.body,
      variables,
    }),
  });
  if (!response.ok) {
    myLogger.error(response.statusText);
    throw new HttpError('Failed to fetch data', response.status);
  }

  const responseData = await response.json() as any;
  if (responseData.errors) {
    throw new Error(`GraphQL error: ${responseData.errors.map((error: any) => error.message).join(', ')}`);
  }
  return responseData.data;
}
