import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SECURITY FIX: Route protection middleware
export function middleware(request: NextRequest) {
  // Add authentication logic here
  // const token = request.cookies.get('auth_token');
  
  // Protect /admin routes or any private pages
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  // SECURITY FIX: Apply security headers via middleware (alternative to next.config.ts)
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
