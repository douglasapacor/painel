import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/site/inicio", request.url))
}
