import z from "zod";
import { BlogStatus } from "../../generated/prisma/enums";

export const createBlogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    status: z.enum(BlogStatus).default("DRAFT").optional(),
    categoryId: z.string()
})

export type CreateBlogRequest = z.infer<typeof createBlogSchema>

