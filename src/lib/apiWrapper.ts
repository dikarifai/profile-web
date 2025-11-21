export function withErrorHandling(handler: Function, routeName: string) {
    return async (req: Request, ctx: any) => {
        try {
            return await handler(req, ctx);
        } catch (err: any) {
            console.error(`Error in ${routeName}`, err);
            return Response.json(
                { success: false, message: err.message ?? "Internal Server Error" },
                { status: err.status ?? 500 }
            );
        }
    };
}