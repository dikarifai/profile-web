import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Prisma } from "../../../generated/prisma/client";
import { paginationParams } from "@/lib/pagination";
import { parseFormData } from "@/lib/parseFormData";
import { createBlogSchema } from "@/dtos/blog.dto";
import { validateRequest } from "@/lib/validation";
import { requireAuth } from "@/lib/authz";

const blogService = {
    getBlogs: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()

        if (!session || errorAuth) return errorAuth;


        const { skip, limit, page } = paginationParams(req)
        const { searchParams } = new URL(req.url)

        const category = searchParams.get("category") || undefined
        const search = searchParams.get("search") || undefined

        const where: Prisma.BlogWhereInput = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } }
            ]
        }

        if (category) {
            where.category = {
                slug: category
            }
        }

        console.log("where:", where);



        const [blogs, total] = await Promise.all([
            prisma.blog.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                where
            }),
            prisma.blog.count()
        ])
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            data: blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            }
        })
    },
    createBlogs: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;


        const { data, error: errorValidation } = await validateRequest(req, createBlogSchema)
        if (!data || errorValidation) return errorValidation;

        const authorId = session?.user.id
        const result = await prisma.blog.create({
            data: { title: "", authorId }
        })

        return NextResponse.json({
            data: result,
            message: "Blog berhasil dibuat"
        })

    }
}

export default blogService