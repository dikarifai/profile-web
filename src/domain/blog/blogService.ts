import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Prisma } from "../../../generated/prisma/client";
import { paginationParams } from "@/lib/pagination";

const blogService = {
    getBlogs: async (req: Request) => {
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
    }
}

export default blogService