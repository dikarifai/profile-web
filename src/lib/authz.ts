import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Utility untuk authorization di API routes-
 */
export async function requireAuth() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return {
            error: NextResponse.json(
                {
                    status: "failed",
                    message: "Unauthorized: Login required",
                },
                { status: 401 },
            ),
        };
    }

    return { session };
}
