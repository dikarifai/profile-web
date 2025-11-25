import { NextResponse } from "next/server";
import z, { ZodError, type ZodType } from "zod";
import { id } from "zod/locales";

z.config(id());

const t = {
    at: "pada",
    prefix: "Validasi gagal",
    separator: "; ",
};

export function formatZodErrorFirst(error: ZodError): string {
    const first = error.issues[0];
    if (!first) return t.prefix;

    const path = first.path.join(".");
    return `${t.prefix}: ${first.message} ${t.at} "${path}"`;
}

export function formatZodError(error: ZodError): string {
    const formatted = error.issues
        .map((err) => {
            const path = err.path.join(".");
            return `${err.message} ${t.at} "${path}"`;
        })
        .join(t.separator);

    return `${t.prefix}: ${formatted}`;
}

/**
 * Validasi request body menggunakan Zod schema.
 *
 * @template T - Tipe data hasil validasi
 * @param {Request} req - Request dari Next.js API handler
 * @param {ZodTypeAny} schema - Schema Zod untuk validasi
 * @returns {Promise<{ data?: T; error?: Response }>} Data hasil parse atau error response
 *
 * @example
 * import { z } from "zod";
 * import { validateRequest } from "@/lib/validation";
 * import { NextResponse } from "next/server";
 *
 * const TransactionSchema = z.object({
 *   amount: z.number().positive(),
 *   category: z.string().min(1),
 *   note: z.string().optional(),
 * });
 *
 * export async function POST(req: Request) {
 *   const { data, error } = await validateRequest(req, TransactionSchema);
 *   if (error) return error;
 *
 *   return NextResponse.json({
 *     status: "success",
 *     message: "Transaksi berhasil disimpan",
 *     data,
 *   });
 * }
 */
export async function validateRequest<T>(
    req: Request,
    schema: ZodType<T>,
): Promise<{ data?: T; error?: NextResponse }> {
    try {
        const body = await req.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            return {
                error: NextResponse.json(
                    {
                        status: "failed",
                        message: formatZodErrorFirst(result.error),
                    },
                    { status: 422 },
                ),
            };
        }

        return { data: result.data };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                error: NextResponse.json(
                    {
                        status: "failed",
                        message: formatZodErrorFirst(error),
                    },
                    { status: 422 },
                ),
            };
        }

        return {
            error: NextResponse.json(
                {
                    status: "failed",
                    message: "Invalid request body",
                },
                { status: 400 },
            ),
        };
    }
}
