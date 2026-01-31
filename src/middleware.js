import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // NextAuth v5 uses AUTH_SECRET, but we fall back to NEXTAUTH_SECRET for compatibility
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  const token = await getToken({
    req,
    secret,
    // NextAuth v5 uses 'authjs.session-token' cookie name by default
    cookieName: process.env.NODE_ENV === 'production'
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token'
  });

  const isLoggedIn = !!token;
  const isBuilderRoute = req.nextUrl.pathname.startsWith('/builder');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirect non-logged-in users to login for protected routes
  if (isBuilderRoute && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/builder/:path*', '/auth/:path*']
};
