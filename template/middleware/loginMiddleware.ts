// middleware/loginMiddleware.ts

import { NextRequest, NextResponse } from "next/server";

export function handleLoginMiddleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isLoginPage = request.nextUrl.pathname === '/login';

    if (!token && !isLoginPage) {
        // Not authenticated, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLoginPage) {
        // Already authenticated, block access to /login
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow request
    return NextResponse.next();
}
