import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Prisma } from "../../../generated/prisma/client";
import { paginationParams } from "@/lib/pagination";
import { parseFormData } from "@/lib/parseFormData";
import { createBlogSchema, updateBlogSchema } from "@/dtos/blog.dto";
import { validateRequest } from "@/lib/validation";
import { requireAuth } from "@/lib/authz";
import { blogRepository } from "./blogRepository";
import { formDataToObject } from "@/lib/formDatatoObject";
import { saveImage } from "@/lib/saveImage";

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
    getBlogsBySlug: async (req: Request, { params }: { params: Promise<{ blogSlug: string }> }) => {
        const { blogSlug } = await params
        console.log("🚀 ~ blogSlug:", blogSlug)

        const blog = await blogRepository.findBySlug(blogSlug)

        return NextResponse.json({
            data: blog,
        })
    },
    createBlogs: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;
        const formData = req.formData()

        const { data, error: errorValidation } = await validateRequest(formData, createBlogSchema)
        if (!data || errorValidation) return errorValidation;

        const authorId = session?.user.id
        const slug = data.title.toLocaleLowerCase().replace(" ", "-")
        const result = await blogRepository.create({ ...data, slug, author: { connect: { id: authorId } } })

        return NextResponse.json({
            data: result,
            message: "Blog berhasil dibuat"
        })
    },
    patchBlogs: async (req: Request, { params }: { params: Promise<{ blogSlug: string }> }) => {
        const { blogSlug } = await params
        const formData = await req.formData();
        let slug = blogSlug
        let imageUrl: string | null = null;

        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;

        const blog = await blogRepository.findBySlug(blogSlug)

        const raw = formDataToObject(formData)

        const { data, error: errorValidation } = await validateRequest(raw, updateBlogSchema)
        if (!data || errorValidation) return errorValidation;

        if (data.image instanceof File) {
            imageUrl = await saveImage(data.image, blog.id, "cover");
        }

        const authorId = session?.user.id

        if (blog?.authorId !== authorId) {
            return NextResponse.json({
                message: "Anda tidak memiliki izin untuk mengedit blog ini."
            }, { status: 403 });
        }

        if (data.title) {
            slug = data.title.toLocaleLowerCase().replace(" ", "-")
        }

        const result = await blogRepository.updateBySlug(blogSlug, { ...data, slug, image: imageUrl })

        return NextResponse.json({
            data: result,
            message: "Blog berhasil diperbarui"
        })
    }
}

export default blogService