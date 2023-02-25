import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Session } from './types'

export function middleware(request: NextRequest) {
    // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // Getting cookies from the request using the `RequestCookies` API
    const value = request.cookies.get('userProfile')?.value
    let role
    if (value) {
        let cookie: Session = JSON.parse(value)
        role = cookie.userProfile.role
    }
    if (request.nextUrl.pathname.startsWith('/') && role === "blogger") {
        return NextResponse.redirect(new URL('/main/blogger', request.url))
    }
    else if (request.nextUrl.pathname.startsWith('/') && role === "admin") {
        return NextResponse.redirect(new URL('/main/admin', request.url))
    }

}
export const config = {
    matcher: ["/"]
}