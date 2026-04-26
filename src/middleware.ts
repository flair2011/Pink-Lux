import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/admin/login');
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute && !isAuthRoute) {
    // Missing Session => redirect to login
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (isAuthRoute && session) {
    // Already logged in => redirect to dashboard
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
