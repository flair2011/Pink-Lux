import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getVerifiedSession } from '@/lib/auth/session';
import { checkSiteStatus, buildMaintenanceResponseHtml } from '@/lib/siteStatus';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/admin/login');
  const isAdminRoute = pathname.startsWith('/admin');

  // Admin panel is exempt from the suspension check so the owner can still
  // manage bookings while a hosting/payment issue with the agency is sorted out.
  if (!isAdminRoute) {
    const status = await checkSiteStatus();
    if (status && status.status !== 'Active') {
      return new NextResponse(buildMaintenanceResponseHtml(status), {
        status: 503,
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Retry-After': '3600' },
      });
    }
  }

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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
