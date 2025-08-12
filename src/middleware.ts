import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"
const publicRoutes = [
  { path: "/autenticacao", whenAuthenticated: "redirect" }
  // { path: "/boletim", whenAuthenticated: "next" }
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/autenticacao"

export function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get("credential")

    if (!authToken && publicRoute) {
      return NextResponse.next()
    }

    if (!authToken && !publicRoute) {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

      return NextResponse.redirect(redirectUrl)
    }

    if (
      authToken &&
      publicRoute &&
      publicRoute.whenAuthenticated === "redirect"
    ) {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = "/"

      return NextResponse.next()
    }

    if (authToken && !publicRoute) {
      const decoded: { exp?: number } = jwtDecode(authToken.value)

      if (!decoded.exp) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

        return NextResponse.redirect(redirectUrl)
      }

      const now = Math.floor(Date.now() / 1000)

      if (decoded.exp < now) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
        return NextResponse.redirect(redirectUrl)
      }

      return NextResponse.next()
    }
  } catch (error) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logos).*)"]
}
