import { myLogger } from '@/app/api/upload/logger';
import { IOrderItem, OrderItem } from '@/models/orderItem';
import fetch, { Response } from 'node-fetch';
import { AuthRequestHeaders } from '@/app/lib/definitions';
import mongoose from 'mongoose';


export const deleteOrderItems = async (createdItem: mongoose.Types.ObjectId[] | IOrderItem[]): Promise<void> => {
  if (!createdItem) return;
  for (const id of createdItem) {
    if (!id) continue;
    if (!(id instanceof mongoose.Types.ObjectId)) continue;
    try {
      await OrderItem.findByIdAndDelete(id.toString());
    } catch (error) {
      myLogger.error(`Error deleting order item with id ${id}: ` + (error as Error).message);
    }
  }
}

// Authenticate and authorize request
export async function authRequest(reqHeader: AuthRequestHeaders): Promise<Response> {
  return await fetch(`${process.env.DELIVER_URL}/api/authenticateAndAuthorize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': reqHeader['authorization']
    },
  });
}

// Graphql request
export async function myRequest(query: any, variables: Record<string, any>): Promise<any> {
  const response = await fetch(`${process.env.DELIVER_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query.loc?.source.body,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  if (responseData.errors) {
    throw new Error(`GraphQL error: ${responseData.errors.map((error: any) => error.message).join(', ')}`);
  }

  return responseData.data;
}