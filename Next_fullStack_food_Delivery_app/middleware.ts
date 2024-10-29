import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleRateLimiting } from '@/lib/rateLimiterMiddleware';
import { corsMiddleware } from '@/lib/corsMiddleware';
import { cspMiddleware } from '@/lib/cspMiddleware';
import { hstsMiddleware } from '@/lib/hstsMiddleware';
import { xContentTypeOptionsMiddleware } from '@/lib/xContentTypeOptionsMiddleware';
import { xFrameOptionsMiddleware } from '@/lib/xFrameOptionsMiddleware';
import { referrerPolicyMiddleware } from '@/lib/referrerPolicyMiddleware';
import { permissionsPolicyMiddleware } from '@/lib/permissionsPolicyMiddleware';


export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  let response = NextResponse.next();

  // Apply CSP (Content Security Policy) middleware to all pages except API routes
  if (!url.pathname.startsWith('/api')) {
    response = cspMiddleware(request);
  }

  // Apply CORS (Cross-Origin Resource Sharing) middleware to API routes only
  if (url.pathname.startsWith('/api')) {
    response = corsMiddleware(request);
  }

  // // Handle rate limiting for all pages
  const rateLimitResponse = await handleRateLimiting(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Apply HSTS (HTTP Strict Transport Security) middleware
  response = hstsMiddleware(request);

  // Apply X-Content-Type-Options middleware
  response = xContentTypeOptionsMiddleware(request);

  // Apply X-Frame-Options middleware
  response = xFrameOptionsMiddleware(request);

  // Apply Referrer-Policy middleware
  response = referrerPolicyMiddleware(request);

  // Apply Permissions-Policy middleware
  response = permissionsPolicyMiddleware(request);

  // Allow request if under the limit
  return response;
}

export const config = {
  matcher: '/:path*',
}
