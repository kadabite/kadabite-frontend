import { myLogger } from '@/app/api/upload/logger';
import { IOrderItem, OrderItem } from '@/models/orderItem';
import fetch, { Response } from 'node-fetch';
import { AuthRequestHeaders } from '@/app/lib/definitions';
import mongoose from 'mongoose';
import { ROLE_BASED_ACCESS_CONTROL } from '@/rbac';
import { Role, Permissions } from '@/types/types';

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

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

// // Authenticate and authorize request
// export async function authRequest(reqHeader: string): Promise<Response> {
//   return await fetch(`${process.env.DELIVER_URL}/api/authenticateAndAuthorize`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': reqHeader
//     },
//   });
// }

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

  const responseData = await response.json();
  if (responseData.errors) {
    throw new Error(`GraphQL error: ${responseData.errors.map((error: any) => error.message).join(', ')}`);
  }
  return responseData.data;
}


export function hasAccessTo(resolverName: keyof Permissions, role: Role): Boolean {
  try {
    const access = ROLE_BASED_ACCESS_CONTROL[role];
    if (access) {
      return access[resolverName] ?? false;
    }
    return false;
  } catch (error) {
    return false;
  }
}
