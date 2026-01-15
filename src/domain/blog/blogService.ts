import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { BlogType, Prisma } from "../../../generated/prisma/client";
import { createBlogSchema, updateBlogSchema } from "@/dtos/blog.dto";
import { validateRequest } from "@/lib/validation";
import { requireAuth } from "@/lib/authz";
import { blogRepository } from "./blogRepository";
import { formDataToObject } from "@/lib/formDatatoObject";
import { removeFile, saveImage } from "@/lib/saveImage";
import cuid from "cuid";
import { migrateImages, removeImages } from "@/lib/imageMigration";
import { buildContentWhere } from "@/lib/contentQuery";
import { paginatedQuery } from "@/lib/paginatedQuery";

const blogService = {
    getBlogs: async (req: Request) => {

        const where: Prisma.BlogWhereInput = await buildContentWhere({ req, searchFields: ["title", "content"], type: "BLOG" })

        const { data: blogs, total, totalPages, limit, page } = await paginatedQuery({
            req,
            findMany: prisma.blog.findMany,
            count: prisma.blog.count,
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json({
            data: blogs,
            pagination: {
                page,
                total,
                limit,
                totalPages,
            }
        })
    },
    getPortfolios: async (req: Request) => {

        const { searchParams } = new URL(req.url)

        const where: Prisma.BlogWhereInput = await buildContentWhere({ req, searchFields: ["title", "content"], type: "PORTFOLIO" })


        const { data: blogs, total, totalPages, limit, page } = await paginatedQuery({
            req,
            findMany: prisma.blog.findMany,
            count: prisma.blog.count,
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json({
            data: blogs,
            pagination: {
                page,
                total,
                limit,
                totalPages,
            }
        })
    },
    getBlogsBySlug: (type: BlogType) => {
        return (
            async (req: Request, { params }: { params: Promise<{ blogSlug: string }> }) => {
                const { blogSlug } = await params

                const { blog, next, prev } = await blogRepository.findBySlug({ slug: blogSlug, type })

                const { status } = blog

                if (status !== "PUBLISHED") {
                    const { session, error: errorAuth } = await requireAuth()
                    if (!session || errorAuth) throw new Error("NOT_FOUND, Blog tidak ditemukan")
                }

                return NextResponse.json({
                    data: blog,
                    navigation: {
                        next,
                        prev
                    }
                })
            }
        )
    },
    createBlogs: async (req: Request): Promise<NextResponse | undefined> => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;
        const formData = await req.formData()
        const raw = formDataToObject(formData)
        let imageUrl: string | null = null;
        const blogId = cuid();

        const { data, error: errorValidation } = await validateRequest(raw, createBlogSchema)
        if (!data || errorValidation) return errorValidation;

        const authorId = session?.user.id
        const slug = data.title.toLocaleLowerCase().replaceAll(" ", "-")

        const blogBySlug = await prisma.blog.findFirst({ where: { slug } })

        if (blogBySlug) {
            return NextResponse.json(
                { message: 'Title already exists' },
                { status: 409 }
            )
        }

        if (data.image instanceof File) {
            imageUrl = await saveImage(data.image, "blogs", blogId);
        }

        const finalContent = data.content && await migrateImages(data.content, "blogs", blogId,)

        const result = await blogRepository.create({ ...data, slug, id: blogId, content: finalContent, image: imageUrl, author: { connect: { id: authorId } } })

        return NextResponse.json({
            data: result,
            message: "Blog berhasil dibuat"
        })
    },
    patchBlogs: async (req: Request, { params }: { params: Promise<{ blogSlug: string }> }) => {
        const { blogSlug } = await params
        const formData = await req.formData();
        let imageUrl: string | null = null;

        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;

        const { blog } = await blogRepository.findBySlug({ slug: blogSlug })

        const raw = formDataToObject(formData)

        const { data, error: errorValidation } = await validateRequest(raw, updateBlogSchema)
        if (!data || errorValidation) return errorValidation;

        if (data.isRemove) {
            if (blog.image) {
                const isRemove = await removeFile(blog.image)
                data.image = null
            }
        }

        if (data.image instanceof File) {
            imageUrl = await saveImage(data.image, "blogs", blog.id);
            data.image = imageUrl
        }

        const authorId = session?.user.id

        if (blog?.authorId !== authorId) {
            return NextResponse.json({
                message: "Anda tidak memiliki izin untuk mengedit blog ini."
            }, { status: 403 });
        }

        const finalContent = data.content && await migrateImages(data.content, "blogs", blog.id)

        data["isRemove"] = undefined
        data["content"] = finalContent

        const result = await blogRepository.updateBySlug(blogSlug, data)

        return NextResponse.json({
            data: result,
            message: "Blog berhasil diperbarui"
        })
    },
    deleteBlogs: async (req: Request, { params }: { params: Promise<{ blogSlug: string }> }) => {
        const { blogSlug } = await params

        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;

        const data = await blogRepository.findBySlug({ slug: blogSlug })


        await removeImages(`/blogs/${data.blog.id}`)
        const blog = await blogRepository.deleteBySlug(blogSlug)

        return NextResponse.json(`Blog ${blog.title} berhasil dihapus`)

    }
}

export default blogService