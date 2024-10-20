import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter } from '@/lib/rateLimiter';
import { initialize } from '@/lib/initialize';

interface RateLimiterRes {
  msBeforeNext: number;
  remainingPoints: number;
  consumedPoints: number;
  isFirstInDuration: boolean;
}

export async function middleware(request: NextRequest) {
  // await initialize(); // Ensure initialization is complete

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

  try {
    await rateLimiter.consume(ip);

    // Allow request if under the limit
    return NextResponse.next();
  } catch (rateLimiterRes) {
    if (rateLimiterRes instanceof Error) {
      console.error('Rate limiter error:', rateLimiterRes);
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    // Type guard to ensure rateLimiterRes is of type RateLimiterRes
    if (typeof rateLimiterRes === 'object' && rateLimiterRes !== null && 'msBeforeNext' in rateLimiterRes) {
      const retryAfter = Math.ceil((rateLimiterRes as RateLimiterRes).msBeforeNext / 1000);
      return new NextResponse(JSON.stringify({ message: 'Too many requests, please try again later.' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
        },
      });
    }

    // Fallback for unexpected error structure
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: '/:path*',
};
