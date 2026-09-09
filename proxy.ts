import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    const isLoginPage = pathname === '/admin/login';

    // 1. Unauthenticated trying to access protected route -> Redirect to login
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. Authenticated trying to access login page -> Redirect to dashboard
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // 3. Authenticated trying to access base /admin -> Redirect to dashboard
    if (token && pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to match specific paths
export const config = {
  matcher: ['/admin/:path*'],
};
