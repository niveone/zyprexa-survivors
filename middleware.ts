import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAdminRoute = nextUrl.pathname.startsWith('/admin')

  if (isAdminRoute) {
    if (isLoggedIn) {
      if (req.auth.user.role !== 'ADMIN') {
        return Response.redirect(new URL('/', nextUrl))
      }
      return
    }
    return Response.redirect(new URL('/api/auth/signin', nextUrl))
  }

  return
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
