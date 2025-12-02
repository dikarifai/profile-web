import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function withErrorHandling(handler: Function, routeName: string) {
    return async (req: Request, ctx: any) => {
        try {
            return await handler(req, ctx);
        } catch (err: any) {
            console.error(`Error in ${routeName}`, err);
            if (err instanceof ZodError) {
                return NextResponse.json(
                    { errors: err.flatten().fieldErrors },
                    { status: 400 }
                );
            }

            if (err.message.includes("NOT_FOUND")) {
                err.status = 404
                err.message = err.message.split(",")[1]
            }

            return Response.json(
                { success: false, message: err.message ?? "Internal Server Error" },
                { status: err.status ?? 500 }
            );
        }
    };
}