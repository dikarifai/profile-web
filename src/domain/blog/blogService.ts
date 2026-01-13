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
import { removeFile, saveImage } from "@/lib/saveImage";
import cuid from "cuid";
import { migrateImages, removeImages } from "@/lib/imageMigration";

const blogService = {
    getBlogs: async (req: Request) => {

        const { skip, limit, page } = paginationParams(req)
        const { searchParams } = new URL(req.url)

        const category = searchParams.get("category") || undefined
        const search = searchParams.get("search") || undefined
        const status = searchParams.get("status") || undefined

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

        if (status) {
            if (status === "DRAFT") {
                const { session, error: errorAuth } = await requireAuth()
                if (!session || errorAuth) return errorAuth;
                where.status = status
            }
            else if (status === "PUBLISHED") {
                where.status = status
            }
        } else {
            const { session, error: errorAuth } = await requireAuth()
            if (!session || errorAuth) return errorAuth;
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

        const { blog, next, prev } = await blogRepository.findBySlug(blogSlug)

        const { status } = blog

        if (status !== "PUBLISHED") {
            const { session, error: errorAuth } = await requireAuth()
            if (!session || errorAuth) return NextResponse.json(
                "Blog tidak ditemukan",
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: blog,
            navigation: {
                next,
                prev
            }
        })
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

        const { blog } = await blogRepository.findBySlug(blogSlug)

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

        const data = await blogRepository.findBySlug(blogSlug)


        await removeImages(`/blogs/${data.blog.id}`)
        const blog = await blogRepository.deleteBySlug(blogSlug)

        return NextResponse.json(`Blog ${blog.title} berhasil dihapus`)

    }
}

export default blogService