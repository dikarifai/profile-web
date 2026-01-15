import z from "zod";
import { Blog, BlogType, Prisma } from "../../generated/prisma/client";

export const BlogStatusEnum = z.enum(["DRAFT", "PUBLISHED"]);
export const BlogTypeEnum = z.enum(BlogType)

const baseBlogSchema = z.object({
    title: z.string().min(1, "Title wajib diisi"),
    content: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    type: BlogTypeEnum.optional(),
    image: z
        .any()
        .nullable()
        .optional()
        .refine((val) => {
            if (val == null) return true;
            if (typeof val === "string") return true;
            if (val instanceof File) {
                const allowed = ["image/jpeg", "image/png", "image/webp"];
                const maxBytes = 5 * 1024 * 1024;
                return allowed.includes(val.type) && val.size <= maxBytes;
            }
            return false;
        }, { message: "Gambar harus JPG/PNG/WEBP dan <= 5MB" }),
    status: BlogStatusEnum.optional(),
    categoryId: z.string().optional().nullable(),
});

export const createBlogSchema = baseBlogSchema.transform((data) => ({
    ...data,
    status: data.status || "DRAFT",
    type: data.type || "BLOG",
    slug: data.title.toLowerCase().replaceAll(/\s+/g, "-"),
}))

export type CreateBlogRequest = z.infer<typeof createBlogSchema>

export const updateBlogSchema = baseBlogSchema.extend({
    isRemove: z.boolean().optional().default(false),
}).partial().transform((data) => ({
    ...data,
    ...(data.title && {
        slug: data.title.toLowerCase().replaceAll(/\s+/g, "-"),
    }),
}));;

export type UpdateBlogRequest = z.infer<typeof updateBlogSchema>

export type BlogResponse = Blog

