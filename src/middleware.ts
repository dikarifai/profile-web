import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const host = req.headers.get("host");

    // Jika subdomain adalah admin
    if (host && host.startsWith("admin.")) {
        url.pathname = `/admin${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}