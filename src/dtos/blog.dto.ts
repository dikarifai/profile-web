import z from "zod";
import { Blog } from "../../generated/prisma/client";

export const BlogStatusEnum = z.enum(["DRAFT", "PUBLISHED"]);

export const createBlogSchema = z.object({
    title: z.string().min(1, "Title wajib diisi"),
    content: z.string().optional().nullable(),
    tags: z.array(z.string()).default([]),
    image: z
        .any()
        .nullable()
        .optional()
        .refine(val => {
            if (val == null) return true;
            if (typeof val === "string") return true; // url ok
            if (val instanceof File) {
                const allowed = ["image/jpeg", "image/png", "image/webp"];
                const maxBytes = 5 * 1024 * 1024; // 5MB
                return allowed.includes(val.type) && val.size <= maxBytes;
            }
            return false;
        }, { message: "Gambar harus JPG/PNG/WEBP dan <= 5MB" }),
    status: BlogStatusEnum.default("DRAFT"),

    categoryId: z.string().optional().nullable(),
})

export type CreateBlogRequest = z.infer<typeof createBlogSchema>

export const updateBlogSchema = createBlogSchema.partial();

export type UpdateBlogRequest = z.infer<typeof updateBlogSchema>

export type BlogResponse = Blog

