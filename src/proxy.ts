import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getVerifiedSession } from '@/lib/auth/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/admin/login');
  const isAdminRoute = pathname.startsWith('/admin');

  const session = isAdminRoute ? await getVerifiedSession() : null;

  if (isAdminRoute && !isAuthRoute && !session) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && session) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
