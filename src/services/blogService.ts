import { BlogResponse, UpdateBlogRequest } from "@/dtos/blog.dto";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse, ApiResponseWithNavigation } from "@/types/api";
import { notFound } from "next/navigation";
import { BlogType } from "../../generated/prisma/enums";

export const blogService = {
    patch: async (slug: string, data: FormData): Promise<BlogResponse> => {
        const res = await fetcher<BlogResponse>(`/blogs/${slug}`, {
            method: "PATCH",
            body: data,
            credentials: "include"
        })

        return res

    },
    create: async (data: FormData): Promise<BlogResponse> => {
        const res = await fetcher<BlogResponse>("/blogs", {
            method: "POST",
            body: data,
            credentials: "include"
        })

        return res
    },
    get: async (params?: { status: "DRAFT" | "PUBLISHED", limit?: number, page?: number, type: "BLOG" | "PORTFOLIO" }): Promise<ApiResponse<BlogResponse[]>> => {
        const searchParams = new URLSearchParams()
        let isPublic = false

        params && Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value))
            if (key === "status") {
                value === "PUBLISHED" && (isPublic = true)
            }
        })


        const res = await fetcher<ApiResponse<BlogResponse[]>>(`/${params?.type.toLowerCase()}s?${searchParams.toString()}`, { credentials: isPublic ? "omit" : "include" })

        return res
    },
    getBySlug: async ({ slug, credentials, type }: { slug: string, credentials?: RequestCredentials, type: BlogType }): Promise<ApiResponseWithNavigation<BlogResponse>> => {
        const res = await fetcher<ApiResponseWithNavigation<BlogResponse>>(`/${type.toLowerCase()}s/${slug}`, { credentials })
        if (!res) return notFound();

        return res
    },
    deleteBySlug: async (slug: string): Promise<string> => {
        const res = await fetcher<string>(`/blogs/${slug}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        )
        return res
    }

}