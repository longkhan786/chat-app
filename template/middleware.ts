// middleware.ts

import { handleLoginMiddleware } from './middleware/loginMiddleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    return handleLoginMiddleware(request);
}

export const config = {
    matcher: [
        '/',                // protect home
        '/chat/:path*',     // protect chat
        '/dashboard/:path*',
        '/profile',
        '/login'            // include login for redirection logic
    ],
};
