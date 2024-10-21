import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleRateLimiting } from '@/lib/rateLimiterMiddleware';
import { corsMiddleware } from '@/lib/corsMiddleware';

export async function middleware(request: NextRequest) {
  // Apply CORS middleware
  const corsResponse = corsMiddleware(request);
  if (corsResponse.status === 204) {
    return corsResponse;
  }

  // Handle rate limiting
  const rateLimitResponse = await handleRateLimiting(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Allow request if under the limit
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}