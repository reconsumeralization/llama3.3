import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    try {
      const isAuth = !!req.nextauth.token
      const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

      if (isAuthPage) {
        if (isAuth) {
          return NextResponse.redirect(new URL('/', req.url))
        }
        return null
      }

      if (!isAuth) {
        let from = req.nextUrl.pathname
        if (req.nextUrl.search) {
          from += req.nextUrl.search
        }
        
        return NextResponse.redirect(
          new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
        )
      }
    } catch (error) {
      console.error('Middleware Error:', error)
      return NextResponse.redirect(
        new URL('/auth/error', req.url)
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}

