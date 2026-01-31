import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(req) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
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
