import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export const blogRepository = {
    findMany: (skip: number, take: number, where: Prisma.BlogWhereInput) =>
        prisma.blog.findMany({
            skip,
            take,
            where,
            orderBy: { createdAt: "desc" },
        }),

    count: (where: Prisma.BlogWhereInput) =>
        prisma.blog.count({ where }),

    findBySlug: async (slug: string) => {

        const blog = await prisma.blog.findUnique({
            where: { slug },
        })

        if (!blog) {
            throw new Error("NOT_FOUND,Blog tidak ditemukan")
        }

        const next = await prisma.blog.findFirst({
            where: {
                createdAt: { gt: blog.createdAt },
                status: "PUBLISHED",
            },
            orderBy: { createdAt: "asc" },
            select: { slug: true, title: true },
        });

        const prev = await prisma.blog.findFirst({
            where: {
                createdAt: { lt: blog.createdAt },
                status: "PUBLISHED",
            },
            orderBy: { createdAt: "desc" },
            select: { slug: true, title: true },
        });

        return { blog, next, prev };
    },

    create: (data: Prisma.BlogCreateInput) =>
        prisma.blog.create({
            data,
        }),

    updateBySlug: (slug: string, data: Prisma.BlogUpdateInput) =>
        prisma.blog.update({
            where: { slug },
            data,
        }),
};
